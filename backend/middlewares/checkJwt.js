const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const {
  config: { auth },
} = require("../config");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${auth.domain}/.well-known/jwks.json`,
  }),
  audience: `${auth.domain}/api/v2/`,
  algorithms: ["RS256"],
});

module.exports = (req, res, next) => {
  checkJwt(req, res, (err) => {
    if (err) {
      const { status, message } = err;
      res.status(err.status).json({ statusCode: status, message });
    }
    req.log.info("The authorization token was sucessfully validated");
    next();
  });
};
