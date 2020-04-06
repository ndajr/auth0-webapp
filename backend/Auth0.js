const axios = require("axios");
const qs = require("querystring");
const { config } = require("./config");

const errorHandler = (err) => {
  const response = err.response;
  const { error, message } = response.data;
  const statusCode = response.status || response.data.statusCode;
  throw { statusCode, error, message };
};

const buildOauthUrl = (provider) => {
  const qParams = [
    `scope=${provider.scope}`,
    `response_type=code`,
    `client_id=${config.auth.clientId}`,
    `state=${config.auth.state}`,
    `audience=${config.auth.domain}/api/v2/`,
    `redirect_uri=${config.auth.appUrl}/login/callback`,
    `connection=${provider.name}`,
  ].join("&");
  return `${config.auth.domain}/authorize?${qParams}`;
};

const authenticate = async (grantType, payload = {}) => {
  const body = {
    grant_type: grantType,
    audience: `${config.auth.domain}/api/v2/`,
    client_id: config.auth.clientId,
    client_secret: process.env.AUTH_SECRET_KEY,
    ...payload,
  };
  return axios
    .post(`${config.auth.domain}/oauth/token`, qs.stringify(body), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(({ data }) => data.access_token)
    .catch(errorHandler);
};

const createUser = async (token, payload) => {
  return axios
    .post(`${config.auth.domain}/api/v2/users`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data)
    .catch(errorHandler);
};

const getUser = async (authorization) => {
  console.log(authorization);
  return axios
    .get(`${config.auth.domain}/userinfo`, {
      headers: { Authorization: authorization },
    })
    .then(({ data }) => data)
    .catch(errorHandler);
};

module.exports = {
  buildOauthUrl,
  authenticate,
  getUser,
  createUser,
};
