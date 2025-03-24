const mysql2 = require("mysql2");
require("dotenv").config();

const params = process.env.MODE == "dep" ?
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,

    } :
    {
        host: process.env.DB_HOST_LOCAL,
        user: process.env.DB_USER_LOCAL,
        password: process.env.DB_PASSWORD_LOCAL,
        database: process.env.DB_NAME_LOCAL,

    }

let conn;
// async function connectDB() {
//     if (!conn) {
//         conn = mysql2.createPool({
//             ...params
//         }).promise()
//     }

//     return conn
// }

async function connectDB() {
    return mysql2.createPool({
        ...params
    }).promise();
}

module.exports ={
    connectDB
}