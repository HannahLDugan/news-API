const express = require("express");
const { getTopics, getEndpoints, getArticlesId, getAllArticles, getComments } = require("./controllers/controllers");
const app = express();


//app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesId);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getComments);







module.exports = app;