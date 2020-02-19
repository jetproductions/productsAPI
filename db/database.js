// const {Pool} = require ('pg');
const {Client, Pool} = require ('pg').native;
require ('dotenv').config();

const connectString = process.env.SQL_STRING;

const client = new Pool({
    connectionString : connectString,
});

// const connectString = process.env.SQL_STRING;

// client.connectSync(connectString,(err)=>{
//     if (err) console.error(err, err.stack);
//     console.log('Connected to DB...')
// });


// let connection = () => {
//     return client.connect(connectString,(err)=>{
//     if (err) console.error(err, err.stack);
//     else {console.log('Connected to DB...')};}
// )};

module.exports = client;