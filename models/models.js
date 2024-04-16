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




module.exports = { selectTopics, selectEndpoints }