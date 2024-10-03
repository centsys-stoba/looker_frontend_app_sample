import { Button } from '@looker/components'
import { oauth_login } from '../helpers/Auth'
import { redeem_auth_code } from '../helpers/Token'
import { useEffect, useState } from 'react'

export default function Home() {
  const [codeVerifier, setCodeVerifier] = useState('')
  const [token, setToken] = useState('')

  const handleLogin = async () => {
    await oauth_login()
    setCodeVerifier(sessionStorage.getItem('code_verifier'))
  }

  const handleGetToken = async () => {
    await redeem_auth_code(document.location.search)
    setToken(sessionStorage.getItem('token'))
  }

  useEffect(() => {
    setCodeVerifier(sessionStorage.getItem('code_verifier'))
    setToken(sessionStorage.getItem('token'))
  }, [])

  return (
    <>
      <h1>Get started with Looker visualization components</h1>
      <Button onClick={handleLogin}>
        Login
      </Button>
      <div>
        code verifier: {codeVerifier}
      </div>
      <Button onClick={handleGetToken}>
        Get Access Token
      </Button>
      <div>
        token: {token}
      </div>
    </>
  )
}
