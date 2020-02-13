const express = require ('express');
const app = express();
const port = 3000;
const bodyParser = require ('body-parser');
require ('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, ()=> console.log(`Listening on port ${port}!`));

