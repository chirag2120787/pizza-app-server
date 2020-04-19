var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var ordersRouter = require('./routes/orders');
var indexRouter = require('./routes/index')

var app = express();

app.use(logger('dev'));
app.use(cors())

app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter)
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;