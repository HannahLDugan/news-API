const db = require ("../db/connection")
const fs = require("fs/promises");

const selectTopics = () => {
    return db.query(`SELECT * FROM topics;`).then((result) => {
        return result.rows
    });
};

const selectEndpoints = async () => {
const endpoints = `./endpoints.json`;
const endpointsString = await fs.readFile(endpoints, "utf-8");
return JSON.parse(endpointsString)
    };

    const selectArticlesId = (article_id) => {
        return db.query(`SELECT * FROM articles
        WHERE article_id=$1`, [article_id])
        .then((response) => {
            if (response.rows.length === 0) {
                return Promise.reject({ status: 404, msg: "not found"});
            }
            return response.rows[0];
        });
    };

    const selectAllArticles = () => {
        return db.query 
        (`SELECT articles.*,
        COUNT(comments.comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments
        ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC;`)
        .then((result) => {
          return result
        })
    };

    const selectAllComments = (article_id) => {
        return db.query 
        (`SELECT *
        FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC;`, [article_id])
       .then(({rows}) => {
        return rows
    });
    };

    const addComment = (article_id, newUsername, commentBody) => {
    if (!article_id || !commentBody) {
        return Promise.reject({status: 400, msg: "invalid request"})
    }
    return db.query(
        `INSERT INTO comments
        (body, author, article_id)
        VALUES ($1, $2, $3)
        RETURNING *;`, [commentBody, newUsername, article_id])
        .then(({rows}) => {
            return rows[0]
        })
    };



module.exports = { selectTopics, selectEndpoints, selectArticlesId, selectAllArticles, selectAllComments, addComment }