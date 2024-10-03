export async function redeem_auth_code(response_str) {
  const params = new URLSearchParams(response_str)
  const auth_code = params.get('code')

  if (!auth_code) {
    console.log('ERROR: No authorization code in response')
    return
  }
  console.log(`auth code received: ${auth_code}`)
  console.log(`state: ${params.get('state')}`)

  const code_verifier = sessionStorage.getItem('code_verifier')
  if (!code_verifier) {
    console.error('ERROR: Missing code_verifier in session storage')
    return
  }
  sessionStorage.removeItem('code_verifier')
  const response = await
  fetch(`${process.env.REACT_APP_LOOKER_API_HOST}:19999/api/token`, {  // This is the URL of your Looker instance's API web service
    method: 'POST',
    mode: 'cors',    // This line is required so that the browser will attempt a CORS request.
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: 'localhost:3000',
      redirect_uri: 'http://localhost:3000/authenticated',
      code: auth_code,
      code_verifier: code_verifier,
    }),
    headers: {
      'x-looker-appid': 'Web App Auth & CORS API Demo', // This header is optional.
      'Content-Type': 'application/json;charset=UTF-8'  // This header is required.
    },
  }).catch((error) => {
    console.error(`Error: ${error.message}`)
  })

  const info = await response.json()
  console.log(`/api/token response: ${JSON.stringify(info)}`)

  // Store the access_token and other info,
  // which in this example is done in sessionStorage

  const expires_at = new Date(Date.now() + (info.expires_in * 1000))
  info.expires_at = expires_at
  console.log(`Access token expires at ${expires_at.toLocaleTimeString()} local time.`)
  sessionStorage.setItem('token', JSON.stringify(info))
}