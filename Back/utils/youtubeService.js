const moment = require('moment')
//const momentduration = require('moment-duration-format')
const { google } = require("googleapis");
const _ = require("lodash");
const sanitizer = require("remove-punctuation");

const youtubeAPI = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_TOKEN,
});

const defaultSearchOptions = {
  maxResults: 50,
  part: "snippet",
  type: "video",
};

const adjustVideoData = (video) => {
  const videoWords = video.snippet.description + video.snippet.title;
  video.mostFrequentWords = Object.entries(_.words(_.lowerCase(sanitizer(videoWords))).reduce(
    (acc, curr) => {
      acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
      return acc;
    },
    {}
  )).sort((a, b) => b[1] - a[1]).slice(0, 5).map(word => word[0]);

    video.contentDetails.duration = convertYouTubeDurations(video.contentDetails.duration);

};

const search = async (q, nextPage = false, data = []) => {
  if (nextPage) defaultSearchOptions.pageToken = nextPage;

  const videosInfo = await youtubeAPI.search.list({
    ...defaultSearchOptions,
    q,
  });

  delete defaultSearchOptions.nextPage;

  const videoIds = videosInfo.data.items.map(({ id: { videoId } }) => videoId);

  const videos = await youtubeAPI.videos.list({
    ...defaultSearchOptions,
    part: "contentDetails",
    id: videoIds,
  });

  const videosNormalizedWithInfo = videos.data.items.map((video, index) => {
    return Object.assign(video, videosInfo.data.items[index]);
  });

  data = [...videosNormalizedWithInfo, ...data];

  if (!data.length < 200) {
    data.forEach(adjustVideoData);
    return data;
  }

  return await search(q, videos.data.nextPageToken, data);
};

const convertYouTubeDurations = (duration) =>  moment.duration(duration).asSeconds();

module.exports = {
  search,
};
