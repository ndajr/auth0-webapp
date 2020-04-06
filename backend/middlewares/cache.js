const NodeCache = require("node-cache");
const ttlSeconds = 86400;
const cache = new NodeCache({
  stdTTL: ttlSeconds,
  checkperiod: ttlSeconds * 0.2,
  useClones: false,
});

module.exports = async (req, res, next) => {
  req.cache = cache;
  next();
};
