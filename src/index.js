const express = require("express");
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const path = require('path');
const routes = require("./routes/per_route")
require('./config/per_db');

//const exphbs1 = require('express-handlebars');
const app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));


app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/Views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: false, layoutsDir: __dirname + '/views/uploadfile/' }));
app.set('view engine', 'hbs');

app.use("/api", routes);
app.listen(4002, () => {
    console.log('Express server started at port : 4002');
});
