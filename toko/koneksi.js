const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db_ekatakog',
    password: 'ELMAKIU14042002',
    port: 5433, // Port default PostgreSQL
});
client.connect(handleError);

function handleError(error) {
  if (error) {
    console.error('Error connecting to database: ' + error);
  }
}
module.exports = client;