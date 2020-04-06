require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Auth0 = require("./Auth0");
const pino = require("express-pino-logger")();
const { config, validateConfig } = require("./config");
const cacheMiddleware = require("./middlewares/cache");
const serverTokenMiddleware = require("./middlewares/serverToken");
const checkJwt = require("./middlewares/checkJwt");

const app = express();
app.use(cors());
app.use(pino);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cacheMiddleware);

validateConfig();

app.get("/social-login", async (req, res) => {
  const defaultScope = "openid profile email";
  const providers = {
    google: Auth0.buildOauthUrl({ name: "google-oauth2", scope: defaultScope }),
    facebook: Auth0.buildOauthUrl({ name: "facebook", scope: defaultScope }),
    linkedin: Auth0.buildOauthUrl({ name: "linkedin", scope: defaultScope }),
  };
  res.json(providers);
});

app.post("/oauth", async (req, res) => {
  try {
    const { code, state } = req.body;
    if (decodeURIComponent(state) !== config.auth.state) {
      res.status(401).json({ message: "Invalid state" });
    }
    const accessToken = await Auth0.authenticate("authorization_code", {
      code,
      redirect_uri: `${config.auth.appUrl}/login/callback`,
    });
    return res.json({ token: accessToken });
  } catch (err) {
    res.status(err.statusCode).json(err);
  }
});

app.post("/authenticate", serverTokenMiddleware, async (req, res) => {
  const token = req.cache.get("token");
  const payload = {
    connection: "Username-Password-Authentication",
    email: req.body.email,
    password: req.body.password,
    email_verified: false,
    verify_email: false,
  };

  try {
    await Auth0.createUser(token, payload);
  } catch (err) {
    if (err.statusCode !== 409) {
      res.status(err.statusCode).json(err);
    }
  }

  const accessToken = await Auth0.authenticate("password", {
    username: req.body.email,
    password: req.body.password,
    scope: "openid",
  });
  res.json({ token: accessToken });
});

app.get("/userinfo", checkJwt, async (req, res) => {
  try {
    const user = await Auth0.getUser(req.headers.authorization);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err" });
  }
});

const port = 8000;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
