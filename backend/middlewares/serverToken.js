const Auth0 = require("../Auth0");
const jwt = require("jsonwebtoken");

const msg = {
  ok: "Token assigned successfully!",
  expired: "Token expired, going to refresh..",
  notFound: "Token not found, going to fetch..",
};

module.exports = async (req, res, next) => {
  const { cache } = req;
  const key = "token";
  try {
    let token;
    token = cache.get(key);
    if (!token) {
      token = await Auth0.authenticate("client_credentials");
      cache.set(key, token);
    }

    const decodedToken = await jwt.decode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      req.log.info(msg.expired);
      token = await Auth0.authenticate("client_credentials");
      cache.set(key, token);
    }

    next();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Internal Error" });
  }
};
