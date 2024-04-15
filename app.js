const express = require("express");
const { getTopics } = require("./controllers/controllers");
const app = express();
require('dotenv').config();


app.use(express.json());

app.get("/api/topics", getTopics);





module.exports = app;