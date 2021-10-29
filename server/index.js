// full_stack/index.js

const express = require("express");
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');



app.listen(3000);