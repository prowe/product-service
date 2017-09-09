const express = require('express');
const data = require('./data.json');
const PORT = 8080;

function listProducts(req, res) {
    console.log('listing products');
    res.json(data);
}

function getProductById(req, res) {
    let id = req.params.id;
    console.log('listing products by id ', id);
    let product = data.find(p => p.id == id);
    
    if (product) {
        res.json(product);
    } else {
        res.status(404).end();
    }
}

const app = express();
app.get('/products', listProducts);
app.get('/products/:id', getProductById);

app.listen(PORT, () => {
    console.log('listening on port ', PORT);
});
