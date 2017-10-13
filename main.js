const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.json');
const PORT = 8080;

function corsMiddleware(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, DELETE, POST, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

const app = express();
app.use(corsMiddleware);
app.use(bodyParser.json());

app.get('/products', (req, res) => {
    console.log('listing products');
    res.json(data);
});

app.get('/products/:id', (req, res) => {
    let id = req.params.id;
    console.log('listing products by id ', id);
    let product = data.find(p => p.id == id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).end();
    }
});

app.listen(PORT, () => {
    console.log('listening on port ', PORT);
});
