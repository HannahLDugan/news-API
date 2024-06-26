const cors = require('cors');
const express = require("express");
const { getTopics, getEndpoints, getArticlesId, getAllArticles, getComments, postComment, patchVotes, deleteComment, getUsers, getUserById } = require("./controllers/controllers");
const app = express();

app.use(cors());


app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesId);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchVotes)

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers);

//psql error handlers

app.use((err, req, res, next) => {
  if (err.code === '22P02') {
      res.status(400).send({ msg: "invalid id" });
  } else if (err.code === '23503') {
      res.status(404).send({ msg: "not found" });
  } else {
      next(err); 
  }
});


//custom error handlers 
app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    }
    next(err);
  });

  app.all("*", (req, res, next) => {
    res.status(404).send({ msg: "not found" });
  });





module.exports = app;