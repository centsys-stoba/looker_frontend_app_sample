import { urlEncode } from './Base64'

export async function oauth_login() {
  const code_verifier = secure_random(32)
  const code_challenge = await sha256_hash(code_verifier)
  const params = {
    response_type: 'code',
    client_id: 'localhost:3000',
    redirect_uri: 'http://localhost:3000/authenticated',
    scope: 'cors_api',
    code_challenge_method: 'S256',
    code_challenge: code_challenge,
  }
  const url = `${process.env.REACT_APP_LOOKER_API_HOST}/auth?${new URLSearchParams(params).toString()}` // Replace base_url with your full Looker instance's UI host URL, plus the `/auth` endpoint.
  console.log(url)

  // Stash the code verifier we created in sessionStorage, which
  // will survive page loads caused by login redirects
  // The code verifier value is needed after the login redirect
  // to redeem the auth_code received for an access_token
  //
  sessionStorage.setItem('code_verifier', code_verifier)

  document.location = url
}

export async function oauth_logout(sdk) {
  await sdk.logout()
    .then(() => {
      sessionStorage.removeItem('code_verifier')
    })
}

function array_to_hex(array) {
  return Array.from(array).map(b => b.toString(16).padStart(2,'0')).join('')
}

function secure_random(byte_count) {
  const array = new Uint8Array(byte_count);
  crypto.getRandomValues(array);
  return array_to_hex(array)
}

async function sha256_hash(message) {
  const msgUint8 = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  return urlEncode(hashBuffer)  // Refers to the implementation of base64.encode stored at https://gist.github.com/jhurliman/1250118
}