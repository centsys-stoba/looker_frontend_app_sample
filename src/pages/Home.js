import { Button } from '@looker/components'
import { oauth_login, oauth_logout } from '../helpers/Auth'
import { redeem_auth_code } from '../helpers/Token'
import { useEffect, useState } from 'react'
import { sdk } from '../helpers/Session'

export default function Home() {
  const [codeVerifier, setCodeVerifier] = useState('')
  const [token, setToken] = useState('')

  const handleLogin = async () => {
    await oauth_login()
    const codeVerifier = sessionStorage.getItem('code_verifier')
    if (codeVerifier) setCodeVerifier(codeVerifier)
  }

  const handleLogout = async () => {
    await oauth_logout(sdk)
    const codeVerifier = sessionStorage.getItem('code_verifier')
    if (!codeVerifier) setCodeVerifier('')
  }

  const handleGetToken = async () => {
    await redeem_auth_code(document.location.search)
    const token = sessionStorage.getItem('token')
    if (token) setToken(token)
    const codeVerifier = sessionStorage.getItem('code_verifier')
    if (!codeVerifier) setCodeVerifier('')
  }

  useEffect(() => {
    setCodeVerifier(sessionStorage.getItem('code_verifier'))
    setToken(sessionStorage.getItem('token'))
  }, [])

  return (
    <>
      <h1>Get started with Looker visualization components</h1>
      <div>
        <Button onClick={handleLogin}>
          Login
        </Button>
        <Button onClick={handleLogout}>
          Logout
        </Button>
        <span>code verifier: {codeVerifier}</span>
      </div>
      <div>
        <Button onClick={handleGetToken}>
          Get Access Token
        </Button>
        <span>token: {token}</span>
      </div>
    </>
  )
}
