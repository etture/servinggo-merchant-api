// const connection = process.env.RDS_URL || require('../local/mysql_connection');
let connection;
if (process.env.NODE_ENV === 'production') {
    connection = {
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    };
} else {
    connection = require('../local/mysql_connection');
}


const knex = require('knex')({
    client: 'mysql',
    connection
});

// Check DB connection
knex.raw("SELECT 'test connection';").then((message) => {
    console.log('DB connected!');
    console.log(connection);
}).catch((err) => {
    throw err;
});

module.exports = knex;