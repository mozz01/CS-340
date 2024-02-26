require("dotenv").config();

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB
})


// Export it for use in our application
module.exports.pool = pool;


//mysql -u [db_username] -p -h classmysql.engr.oregonstate.edu