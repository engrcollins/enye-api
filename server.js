
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// importing files
const routes = require('./routes/api');

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080;

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const wishRouter = require('./routes/api')
app.use('/api', wishRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to McCollins Technologies." });
});

    /*app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });*/

app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});