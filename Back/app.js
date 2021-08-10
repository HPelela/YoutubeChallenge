const express = require("express")
const app = express();

require('dotenv').config()  
const cors = require('cors');

const port = process.env.PORT || 8080;
app.use(cors());

const youtubeRoutes = require('./routes/search');

app.use(express.json());

app.use('/', youtubeRoutes);

app.listen(port);
