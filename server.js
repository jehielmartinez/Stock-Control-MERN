const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');

const providerRoutes = require('./api/providerRoutes');

const app = express();
const port = process.env.PORT || 4000;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(bodyParser.json());
app.use(allowCrossDomain);

//Routes
app.use('/providers', providerRoutes);


app.listen(port, () => console.log(`listening on http://localhost:${port}`));

module.exports = {app};
