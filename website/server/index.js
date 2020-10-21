const express = require('express');
const path = require('path');
const app = express();

const HTTP_PORT = process.env.httpPort || 3001;
const HTTP_HOST = process.env.httpHost|| 'localhost';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/*', (req, res)  => {
    res.sendFile(path.join(__dirname, '..', 'build/index.html'), err => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(HTTP_PORT, () => {
    console.log(`Find the server at: http://${HTTP_HOST}:${HTTP_PORT}/`);
});
