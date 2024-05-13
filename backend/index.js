const express = require('express');

const cors = require('cors');

const app = express();
const routes = require('./route');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Auth-Token');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Vary', 'Origin');
    next();
});


app.use('/api', routes);

app.get('/api/test', (req, res) => {
    return res.status(200).send({ message: "Test Successfull" });
})

app.use((req, res) => {
    return res.status(404).send({ message: "Resource not found" });
})

app.use((err, req, res, next) => {
    let status = 500;
    let message = "Server Error";

    if (err.name === "ValidationError") {
        status = 400;
        message = "Validation Error"
    }

    return res.status(status).send({ message, error: err });
})

const PORT = process.env.port || 8000;

app.listen(PORT, ()=>{
    console.log(`Server started at port: ${PORT}`);
})