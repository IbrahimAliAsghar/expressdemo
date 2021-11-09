var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var multer = require('multer');
//var upload = multer();
var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});

var index = require('./routes/index');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array()); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', index);

// var admin = require("firebase-admin");

// var serviceAccount = require("./testdenning-firebase-adminsdk-a6bl4-bab46e9358.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: process.env.BUCKET_URL
// });
// app.locals.bucket = admin.storage().bucket()



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
//const server = app.listen(3000, () => console.log(`Express server listening on port 3000`));


module.exports = app;
