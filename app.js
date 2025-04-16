var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const port = 3001

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// // Endpoint POST untuk menerima webhook
// app.post('/webhook', (req, res) => {
//   console.log('Received message:', req.body);
//   res.status(200).send({ status: 'Message received successfully' });
// });


// 1. Simpan data masuk dari webhook
let webhookData = [];

// 2. Endpoint webhook: simpan ke array & kirim respon
app.post('/webhook', (req, res) => {
  console.log('Received message:', req.body);
  webhookData.push(req.body); // simpan ke memori
  res.status(200).send({ status: 'Message received successfully' });
});

// 3. Endpoint untuk menampilkan data webhook yang sudah masuk
app.get('/log', (req, res) => {
  res.send(`
    <h1>Webhook Received Data</h1>
    <ul>
      ${webhookData.map((data, index) => `<li><pre>${JSON.stringify(data, null, 2)}</pre></li>`).join('')}
    </ul>
  `);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
