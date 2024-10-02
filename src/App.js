import { sdk } from '../src/helpers/CorsSession'
import { Query, Visualization } from '@looker/visualizations'
import { DataProvider } from '@looker/components-data'
import { Button, ComponentsProvider } from '@looker/components'
import { oauth_login } from './helpers/Auth'
import { redeem_auth_code } from './helpers/Token'
import { useEffect, useState } from 'react'

function App() {
  const [codeVerifier, setCodeVerifier] = useState('')
  const [accessInfo, setAccessInfo] = useState('')

  const handleLogin = async () => {
    await oauth_login()
    setCodeVerifier(sessionStorage.getItem('code_verifier'))
  }

  const handleAccessInfo = async () => {
    await redeem_auth_code(document.location.search)
    setAccessInfo(sessionStorage.getItem('access_info'))
  }

  useEffect(() => {
    setCodeVerifier(sessionStorage.getItem('code_verifier'))
    setAccessInfo(sessionStorage.getItem('access_info'))
  }, [])

  return (
    <>
      <h1>Get started with Looker visualization components</h1>
      <ComponentsProvider>
        <Button onClick={handleLogin}>
          Login
        </Button>
        <div>
          code verifier: {codeVerifier}
        </div>
        <Button onClick={handleAccessInfo}>
          Token
        </Button>
        <div>
          token: {accessInfo}
        </div>
        <DataProvider sdk={sdk}>
          {/* Change this query slug to match your query slug */}
          <Query query="GyUTPxDEVLIzTFhS7QPMXY">
            <Visualization />
          </Query>
        </DataProvider>
      </ComponentsProvider>
    </>
  )
}

export default App