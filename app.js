var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
const crypto = require('crypto');

//1.
var http = require('http');
var fs = require('fs');
//2.
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.post('/hash',function (req,res) {
    var hashData = req.body;
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'snap.printo@gmail.com',
            pass: 'printo@123'
        }
    });

htmlContent=fs.readFileSync(__dirname + '/MyPage.html','utf8')
console.log('created');
    transporter.sendMail({

        from: 'IWP <snap.printo@gmail.com>',
        to: hashData.email.toString(),
        subject: "IWP Notification",
        html: htmlContent

    });

    res.json({ status : "sent" });
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
