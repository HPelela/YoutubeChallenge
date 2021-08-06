const express = require('express');
const searchControl = require('../controller/searchControl')

const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/search', searchControl.searchQuery);

module.exports = router;
