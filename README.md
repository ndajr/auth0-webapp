# Auth0 Authorization Flow
Simple Node.js and React using Auth0 as Authorization Server

## Instructions

### Initial config
1) `cp client/.env.example client/.env`
1) `cp backend/.env.example backend/.env`
1) Create an Regular Web Application app on Auth0
1) Copy the Domain, client ID and client secret to the backend/.env file
1) Generate a random string: `openssl rand -base64 32` and paste the value to AUTH_STATE key on backend/.env file
1) Download a https tunnel proxy, I highly recommend [ngrok](https://ngrok.com/)
1) Run `ngrok http 3000` which will listen to frontend port and copy the https link to AUTH_APP_URL file
1) Go to the Auth0 dashboard and configure the Application URIs:
- Application Login URI: https://yourlink.ngrok.io/login
- Allowed Callback URLs: https://yourlink.ngrok.io/login/callback
- Allowed Web Origins: https://yourlink.ngrok.io
1) Enable the Social providers that you want on Auth0 Dashboard -> Connections -> Social. On the provider developers page, always configure the login page to Auth0 Application Login URI and Auth0 Allowed Callback URLs

### Running
```
cd client && npm start && cd ../
cd backend && npm start && cd ../
```
