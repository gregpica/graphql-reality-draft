const pgPromise = require('pg-promise');

require('dotenv').config();
const connStr = process.env.DATABASE_URL;

const pgp = pgPromise({});
const db = pgp(connStr); 

module.exports = db;