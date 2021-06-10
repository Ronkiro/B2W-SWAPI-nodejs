const { Router } = require('express');

// Resources
const { get, post, del } = require('./actions');

const router = Router();

// endpoints
router.delete('/planets', del);
router.get('/planets', get);
router.post('/planets', post);

module.exports = router;
