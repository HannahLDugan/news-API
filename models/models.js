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
        return db.query(`SELECT articles.*,
        COUNT(comments.article_id)
        AS comment_count
        FROM articles
        LEFT JOIN comments
        ON comments.article_id = articles.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id`, [article_id])
        .then((response) => {
        if (response.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "not found"});
        }
        return response.rows[0];
        });
    };

    const selectAllArticles = (topic) => {
        let query = 
             `SELECT articles.*,
        COUNT(comments.comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments
        ON articles.article_id = comments.article_id
        `;

    const topicQuery = ['mitch', 'paper', 'cats']

    if (topic && topicQuery.includes(topic)) {
        query += ` WHERE topic = '${topic}'`;
    } else if (topic && !topicQuery.includes(topic)) {
        return Promise.reject({ status: 400, msg: "not found" });
    }

    query += `
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC;
    `;
    
    return db.query(query)
        .then((result) => {
            return result.rows;
        });
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

    const updateVotes = async (article_id, inc_votes) => {
  return await db.query(
        `UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;`,
        [inc_votes, article_id])
        .then(({rows}) => {
            return rows[0]
        });
    };

    const removeComment = (comment_id) => {
            return db.query(
                `DELETE FROM comments
                WHERE comment_id = $1
                RETURNING *;`, 
                [comment_id])
        .then(({rows}) => {
            if (rows.length === 0)
            return Promise.reject({
                status: 404,
                msg: "invalid id",
              });
        });
    };

    const selectUsers = () => {
        return db.query (`SELECT * FROM USERS;`)
        .then(({ rows }) => {
            return rows
        });
    };


module.exports = { selectTopics, selectEndpoints, selectArticlesId, selectAllArticles, selectAllComments, addComment, updateVotes, removeComment, selectUsers }