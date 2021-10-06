const express = require('express');

const sequelize = require('./util/database.util');
const Movie = require('./models/movies.model');
const path = require('path');
const multer = require('multer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET','POST','PUt','DELETE');
    next();
});

app.use('/api/v1', require('./routes/index.route'));
app.use('/api/v1/movies', require('./routes/movies.route'));
app.get('/api/v1/import', (req, res) => res.sendFile(path.join(__dirname + "/view/import.html")));

(async () =>{
    try {
      await sequelize.sync(
        {alter: true}
      );
      console.log("test");
      app.listen(process.env.EXTERNAL_PORT || 8000);
    } catch (error) {
      console.error(error);
    }
  })()
