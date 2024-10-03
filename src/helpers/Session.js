import { Looker40SDK } from '@looker/sdk'
import {
  AuthToken,
  AuthSession,
  BrowserTransport,
  DefaultSettings,
} from '@looker/sdk-rtl'

class SDKSession extends AuthSession {
  activeToken = new AuthToken()
  constructor(settings, transport) {
    super(settings, transport || new BrowserTransport(settings))
  }

  // This function checks to see if the user is already authenticated
  isAuthenticated() {
    const token = this.activeToken
    if (!(token && token.access_token)) return false
    return token.isActive()
  }

  // This function gets the current token or fetches a new one if necessary
  async getToken() {
    if (!this.isAuthenticated()) {
      const token = sessionStorage.getItem('token')
      if (token) {
        this.activeToken.setToken(JSON.parse(token))
      }
    }
    return this.activeToken
  }

  // This function authenticates a user, which involves getting a new token
  // It returns a modified object with a new authorization header.
  async authenticate(props) {
    const token = await this.getToken()
    if (token && token.access_token) {
      props.mode = 'cors'
      delete props.credentials
      props.headers = {
        ...props.headers,
        Authorization: `Bearer ${this.activeToken.access_token}`,
      }
    }
    return props
  }
}

// This creates a new session with the 'real' address used above
const session = new SDKSession({
  ...DefaultSettings,
  base_url: process.env.REACT_APP_LOOKER_API_HOST,
})

// This exports the SDK with the authenticated session
export const sdk = new Looker40SDK(session)