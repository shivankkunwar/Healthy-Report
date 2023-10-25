import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import {Auth0Provider} from "@auth0/auth0-react"


const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId= process.env.REACT_APP_AUTH0_CLIENT_ID;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience:"Health api unique Identifier"
      }}
      scope ="openid profile email"
    >
      <App />
    </Auth0Provider>
    
  </React.StrictMode>,
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

