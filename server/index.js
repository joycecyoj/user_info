const express = require('express');
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))

app.use(cors());

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api')); // include our routes!

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
