"use strict";
const youtubeService = require("../utils/youtubeService");

// const cached = require('cached');
// const kittens = cached('kittens');

  
const searchQuery = async (req, res) => {
  const querySearch = req.body;

  const videos = await youtubeService.search(querySearch.q);

  return res.json(videos);
};

module.exports = {
  searchQuery,
};
