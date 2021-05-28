const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const model = require('../model/AnomalyDetector')
const alert = require('alert')

// 1 --> Simple
// 2 --> hybrid

let is_learn_csv_uploaded = false
let is_detect_csv_uploaded = false
let app = express();
let map = [];
let map2 = [];
let detectMethod = 1;


// view engine setup
//app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('views'))
app.use(express.static(path.join(__dirname, '../views')));
app.use(fileUpload({}))

// main page
app.get("/", (req,res) => {

  res.sendFile('index.html')

});

app.post('/uploadCSVLearn', (req, res) => {
  if(req.files != null) {
    let learnFile = req.files.learnCSVFile
    if (learnFile != null) {
      let ext = learnFile.name.split('.')
      if (ext[ext.length - 1] !== 'csv') {
        alert("Please upload a CSV file");
        res.end();
        return

      }
      res.write('learn normal from : ' + learnFile.name)
      is_learn_csv_uploaded = true
      let data = learnFile.data.toString()
      map = model.createTimeSeries(data)
    }
  }
  res.end()
})

app.post('/uploadCSVDetect', (req, res) => {
  if(req.files != null) {
    let detectFile = req.files.detectCSVFile

    if (detectFile != null) {
      let ext = detectFile.name.split('.')
      if (ext[ext.length - 1] !== 'csv') {
        alert("Please upload a CSV file");
        res.end();
        return
      }
      res.write('detect anomalies from : ' + detectFile.name)
      is_detect_csv_uploaded = true
      let detectData = detectFile.data.toString()
      map2 = model.createTimeSeries(detectData)
    }
  }
  res.end()
})

app.post('/setDetector', (req, res) => {
  detectMethod = parseInt(req.body.detectorType)
  if (detectMethod === 1 )
    res.write("Linear Regression detector")
  else
    res.write("Minimum Circle detector")
  res.end()
})

app.post('/detect',(req, res) => {

  // user story 1
  if (is_learn_csv_uploaded && is_detect_csv_uploaded) {
    let cf = model.learnNormal(map, detectMethod)

    let ar = model.detectAnomalies(map2, cf, detectMethod)
    for(let i = 0; i < ar.length; i++) {
      //res.write(JSON.stringify(ar[i]) + "\n")
     let desc  = i.toString() + ". " + ar[i].feature1 + " with " + ar[i].feature2  +" at line " + ar[i].line.toString() + '\n'
      res.write(desc)

    }
  if (ar.length === 0) {
    res.write("No Anomalies Detected !")
  }
  res.end()
  return;
  }
  // http  post for story 2
  if(req.files != null) {
    map = model.createTimeSeries(req.files.learnFile.data.toString())
    map2 = model.createTimeSeries(req.files.detectFile.data.toString())
    const type = req.body.type
    let method = 0
    if (type === 'simple')
      method = 1
    else if (type === 'hybrid')
      method = 2
    else {
      alert("type is not supported !")
      res.end();
    }
    let cf = model.learnNormal(map,method)
    let ar = model.detectAnomalies(map2 , cf, method)
    res.send(ar)
    res.end()
  }
  else {
    if (!is_learn_csv_uploaded) {
      alert("please upload CSV learn file first")
      res.end()
    }
    else {
      alert("please upload CSV detect file first")
      res.end()
    }
  }

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
  //next(createError(404));
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

