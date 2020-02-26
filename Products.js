require ('newrelic');
const express = require ('express');
const app = express();
const port = 1337;
const bodyParser = require ('body-parser');
require ('dotenv').config()
const routes = require ('./routes');


app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', routes);

app.listen(port, ()=> console.log(`Listening on port ${port}!`));