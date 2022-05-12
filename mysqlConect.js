const mysql = require("mysql2");

//coloque seus dados 
const pool = mysql.createPool({
    "user": "",
    "password": "",
    "database": "",
    "host": "",
    "port": 
})

exports.pool = pool;