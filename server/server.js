//create a request for array from database and display in terminal
//require express
const express = require("express");
const app = express();

//bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const PORT = 5000;

const pool = require('./modules/pool.js');

app.use(express.static('server/public'));

app.get('/shoes', (req, res) => {
    //this will communicate with the database and send back the rows in an object
    pool.query(`SELECT * FROM "shoes" ORDER BY "id";`)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('Error making SELECT query', error);
        });
});

app.put('/shoes', (req, res) => {
    console.log('put route was hit');
    console.log(req.body);
    pool.query(`UPDATE "shoes" SET "cost"=$1
                WHERE "id"=$2;`, [req.body.price, req.body.theId])
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('Error making SELECT query', error);
        });
});







app.listen(PORT);
console.log("Listening on PORT: ", PORT);