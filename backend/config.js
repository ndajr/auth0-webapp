const assert = require("assert");

const config = {
  auth: {
    domain: `https://${process.env.AUTH_DOMAIN}`,
    clientId: process.env.AUTH_CLIENT_ID,
    secretKey: process.env.AUTH_SECRET_KEY,
    appUrl: process.env.AUTH_APP_URL,
    state: process.env.AUTH_STATE,
  },
};

const validateConfig = () => {
  assert.ok(config.auth.domain, "Ensure AUTH_DOMAIN env is provided.");
  assert.ok(config.auth.clientId, "Ensure AUTH_CLIENT_ID env is provided.");
  assert.ok(config.auth.secretKey, "Ensure AUTH_SECRET_KEY env is provided.");
  assert.ok(config.auth.state, "Ensure AUTH_STATE env is provided.");
};

module.exports = { config, validateConfig };
