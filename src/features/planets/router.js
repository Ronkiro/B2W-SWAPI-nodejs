const { Router } = require('express');

// Resources
const { get, post } = require('./actions');

const router = Router()

// endpoints
router.get('/planets', get)
router.post('/planets', post)

module.exports = router;