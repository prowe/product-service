const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.json');
const PORT = 8080;

function corsMiddleware(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

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
app.use(corsMiddleware);
app.use(bodyParser.json());
app.get('/products', listProducts);
app.get('/products/:id', getProductById);

let lineItemIds = 0;
const shoppingCarts = {};

app.post('/shopping-carts/:id/line-items', (req, res) => {
    let id = req.params.id;
    let cart = shoppingCarts[id];
    if(!cart) {
        cart = shoppingCarts[id] = {
            lineItems: []
        };
    }

    let lineItem = req.body;
    lineItem.lineItemId = ++lineItemIds;
    console.log('adding', lineItem);
    cart.lineItems.push(lineItem);
    res.json(cart);
});

app.get('/shopping-carts/:id', (req, res) => {
    let id = req.params.id;
    let cart = shoppingCarts[id];
    res.json(cart);
});

app.listen(PORT, () => {
    console.log('listening on port ', PORT);
});
