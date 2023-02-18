const router = require('express').Router()
const fetch = require('node-fetch')
const rateLimiter = require('../middleware/rate-limiter')

router.get('/data', rateLimiter, async (req, res, next) => {
  try {
    const TARGET_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    const targetRes = await fetch(TARGET_URL)
    if (targetRes.status !== 200) {
      return res.status(500).json({ message: 'fail to fetch' })
    }
    const result = await targetRes.json()
    return res.status(200).json({ result })
  } catch (err) {
    next(err)
  }
})

module.exports = router