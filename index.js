const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = require('./routes/index');
const db = require('./database/db');
const Record = require('./models/transactionModel');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, '/views')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

const port = 3002;
app.listen(port, (err) => {
    if (!err) {
        console.log(`Server running on http://localhost:${port}`);
    } else {
        console.error('Error starting server:', err);
    }
});
