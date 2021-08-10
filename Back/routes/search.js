const express = require('express');
const searchControl = require('../controller/searchControl')

const router = express.Router();

router.post('/search', searchControl.searchQuery);

module.exports = router;
