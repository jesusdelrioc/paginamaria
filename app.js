require('dotenv').load()
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');




//CONECTA LA BBDD


const index = require('./routes/index');
const proyecto1 =require('./routes/proyecto1')
const proyecto2 =require('./routes/proyecto2')
const proyecto3 =require('./routes/proyecto3')
const proyecto4 =require('./routes/proyecto4')



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/lib/jquery', express.static(path.join(__dirname, 'node_modules/jquery/')));
app.use('/lib/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/')));




app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.title = 'Proyecto 1';
  next();
})

app.use('/', index);
app.use('/proyecto1', proyecto1);
app.use('/proyecto2', proyecto2);
app.use('/proyecto3', proyecto3);
app.use('/proyecto4', proyecto4);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
