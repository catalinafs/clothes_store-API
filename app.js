require('dotenv').config();
let express = require('express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();

// The app is told that we are going to be using cors
app.use(cors());

// The app is told that we are going to be using the json format
app.use(express.json)

// Create connection with mysql
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clothes_store',
    port: '3306'
});

// Test if the mysql connection was successful
connection.connect(function (error) {
    if (error) throw error; else console.log('Successful Connection');
});

// Port is set
const port = process.env.PORT || 7900;

// Get: Home Root
app.get('/', function (req, res) {
    res.send('Welcome to the Clothes Store API');
});

// Get: all from the product table
app.get('/api/products', function (req, res) {
    connection.query('SELECT * FROM product', function (error, rows) {
        if (error) throw error; else res.send(rows);
    });
});

// Get: the specific product
app.get('/api/products/:id', function (req, res) {
    connection.query('SELECT * FROM product WHERE id = ?', [req.params.id], function (error, row) {
        if (error) throw error; else res.send(row);
    });
});

// Post:
app.post('/api/products', function (req, res) {
    let data = {
        type: req.body.type,
        model: req.body.model,
        brand_id: req.body.brand_id,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        stock: req.body.stock,
        provider_id: req.body.provider_id,
        availability: req.body.availability
    }
    let sql = 'INSERT INTO product VALUE ?'

    connection.query(sql, data, function (error, results) {
        if (error) throw error; else res.send(results);
    });
});

// Put:
app.put('/api/products/:id', function (req, res) {
    let type = req.body.type;
    let model = req.body.model;
    let brand_id = req.body.brand_id;
    let size = req.body.size;
    let color = req.body.color;
    let price = req.body.price;
    let stock = req.body.stock;
    let provider_id = req.body.provider_id;
    let availability = req.body.availability;

    let sql = 'UPDATE product SET provider_id = ?, type = ?, model = ?, brand_id = ?, size = ?, color = ?, price = ?, stock = ?, availability = ? WHERE id = ?';

    connection.query(
        sql,
        [type, model, brand_id, size, color, price, stock, provider_id, availability],
        function (error, results) {
            if (error) throw error; else res.send(results);
        }
    );
});

//Delete:
app.delete('/api/products/:id', function (req, res) {
    connection.query('DELETE FROM product WHERE id = ?', [req.params.id], function(error, rows){
        if (error) throw error; else res.send(rows);
    });
});

// Listen: the server and check if the connection is good
app.listen(port, function () {
    console.log(`🚀Server Connection OK - port: ${port}`);
});