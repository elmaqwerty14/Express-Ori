const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db_ekatakog',
    password: 'ELMAKIU14042002',
    port: 5433, // Port default PostgreSQL
});

module.exports = client;