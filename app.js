const express = require("express");
const { getTopics, getEndpoints, getArticlesId } = require("./controllers/controllers");
const app = express();


app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesId);





module.exports = app;