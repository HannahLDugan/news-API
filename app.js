const express = require("express");
const { getTopics, getEndpoints } = require("./controllers/controllers");
const app = express();


app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);





module.exports = app;