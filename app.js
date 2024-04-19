const express = require("express");
const { getTopics, getEndpoints, getArticlesId, getAllArticles, getComments, postComment } = require("./controllers/controllers");
const app = express();

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesId);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComment);




//psql error handlers

// app.use((err, req, res, next) => {
//   if (err.code === '22P02') {
//     res.status(400).send({ msg: "invalid id" });
//   }
//   next(err);
// });

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