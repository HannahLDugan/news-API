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
        //need to send a JSON stringified file
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





    //     .then(({ rows: articles }) => {
    //        return articles
    //        });
    //    };
   


    // author
    // title
    // article_id
    // body
    // topic
    // created_at
    // votes
    // article_img_url



module.exports = { selectTopics, selectEndpoints, selectArticlesId }