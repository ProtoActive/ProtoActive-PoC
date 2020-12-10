//서버 실행에 필요한 패키지 포함 (require)
//npm을 통해 설치해야함
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var serveStatic = require('serve-static');
require('firebase/storage');
var firebase = require('firebase');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload =multer({dest:'/images/'});
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(upload.array());
//html파일들 포함
app.use('/', express.static(__dirname + '/HTML'));
//서버 실행 - 포트번호 3000
var server = http.createServer(app).listen(3000, function () {
  console.log("Express server running..." + server.address().port);
});
//firebase 선언 
var firebaseConfig = {
  apiKey: 'AIzaSyAMvOVUmUek102jmMzE85m2JYtP_t3TnpI',
  authDomain: "daangn-market-server.firebaseapp.com",
  databaseURL: 'https://twitter-server-c6b69.firebaseio.com',
  storageBucket: 'gs://daangn-market-server.appspot.com'
};
firebase.initializeApp(firebaseConfig);
app.post('/api/file',upload.single('file'), function (req, res) {

  var filelist = req.file;
  var message = req.body.message;
  var storageRef = firebase.storage().ref();
  console.log(filelist);
  console.log(message);
  var uploadTask = storageRef.child('images').put(filelist);
  
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', function (snapshot) {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function (error) {
    // Handle unsuccessful uploads
  }, function () {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      console.log('File available at', downloadURL);
    });
  });
  res.send("success!");
});



