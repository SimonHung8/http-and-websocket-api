const requestIp = require('request-ip')
const redis = require('../config/redis')

module.exports = async (req, res, next) => {
  try {
    const DEFAULT_IP_LIMIT = 10
    const DEFAULT_ID_LIMIT = 5
    const DEFAULT_EXPIRE_SECONDS = 60
    const userIp = requestIp.getClientIp(req)
    const userId = req.query.user
    if (!Number(userId) || Number(userId) < 1 || Number(userId) > 1000) {
      return res.status(401).json({ message: 'user not found' })
    }
    const ipCounts = await redis.incr(userIp)
    const idCounts = await redis.incr(userId)
    if (ipCounts === 1) {
      await redis.expire(userIp, DEFAULT_EXPIRE_SECONDS)
    }
    if (idCounts === 1) {
      await redis.expire(userId, DEFAULT_EXPIRE_SECONDS)
    }
    if (ipCounts > DEFAULT_IP_LIMIT || idCounts > DEFAULT_ID_LIMIT) {
      return res.status(429).json({ ip: ipCounts, id: idCounts })
    }
    next()
  } catch (err) {
    next(err)
  }
}