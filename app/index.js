const express = require('express');

const sequelize = require('./util/database.util');
const User = require('./models/users.model')

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET','POST','PUt','DELETE');
    next();
});

app.use('/api/v1', require('./routes/index.route'));
app.use('/api/v1/users', require('./routes/users.route'));
// app.use('/api/v1/movies', require('./routes/movies.route'));

(async () =>{
    try {
      await sequelize.sync(
        {force: false}
      );
      console.log("test");
      app.listen(process.env.EXTERNAL_PORT || 8000);
    } catch (error) {
      console.error(error);
    }
  })()
