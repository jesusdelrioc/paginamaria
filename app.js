// const express = require('express');

// const index = require('./routes/index');

// const app = express();

// app.use('/', index);


// module.exports = app;

require('dotenv').load()
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



//CONECTA LA BBDD

const index = require('./routes/index');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/lib/jquery', express.static(path.join(__dirname, 'node_modules/jquery/')));
app.use('/lib/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/')));

// app.use(session({
//   secret: "our-passport-local-strategy-app",
//   resave: true,
//   saveUninitialized: true,
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     ttl: 24 * 60 * 60 // 1 day
//   })
// }));


// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   res.locals.title = 'Proyecto 2';
//   next();
// })

app.use('/', index);


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
