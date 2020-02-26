// const {Pool} = require ('pg');
const Pool = require ('pg-pool');
require ('dotenv').config();

const connectString = process.env.SQL_STRING;

const pool = new Pool({
    connectionString : connectString,
});

module.exports = pool;