//서버 실행에 필요한 패키지 포함 (require)
//npm을 통해 설치해야함
var express = require('express');
var http = require('http');
var path = require('path');
let fs = require('fs');
var serveStatic = require('serve-static');
require('firebase/storage');
var firebase = require('firebase');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(upload.array());
//html파일들 포함
//app.use('/', express.static(__dirname + '/HTML'));
app.use('/', express.static(__dirname + '/drag_and_drop'));

//서버 실행 - 포트번호 3000
var server = http.createServer(app).listen(3000, function () {
  console.log("Express server running..." + server.address().port);
});

//firebase 선언 
const firebaseConfig = {
  apiKey: "AIzaSyAMvOVUmUek102jmMzE85m2JYtP_t3TnpI",
  authDomain: "daangn-market-server.firebaseapp.com",
  databaseURL: "https://daangn-market-server.firebaseio.com",
  projectId: "daangn-market-server",
  storageBucket: "daangn-market-server.appspot.com",
  messagingSenderId: "501716266274",
  appId: "1:501716266274:web:361710c85a52c93408c97b",
  measurementId: "G-4JLHP9YZGV"
};
firebase.initializeApp(firebaseConfig);


//json 갱신하는 ajax
app.post('/api/update', function (req, res) {
  var json = req.body.data;
  var filename =req.body.filename; //수정할 json파일이름
  let json_apply = JSON.stringify(json);
  fs.writeFileSync('./version2_3/'+filename, json_apply); //json덮어쓰기
  res.send(json)//json respond
});

//좋아요 올리는 ajax
app.post('/api/like', function (req, res) {

  var keyvalue = req.body.key; //게시물 key값 받아옴
  var likes = req.body.Likes; //게시물 좋아요 수 받아옴
  var database = firebase.database();
  var postref = database.ref('/'+keyvalue); //해당 게시물 key 통해 접근
  likes++; //좋아요 증가
  postref.update({ 'Like': likes }); // 해당 게시물 좋아요 update
  res.send({ likes });
});

//게시글 올리는 ajax
var Postingcnt=1;
app.post('/api/text', function (req, res) {
  var json;
  var postname = req.body.name; //유저 아이디
  var postText = req.body.text;// 게시물 내용
  var database = firebase.database();
  Postingcnt++; //게시물 번호 부여
  var postingref = database.ref('/');
  json ={ 'user_id': postname, 'text': postText, 'Like': 0, 'posting_id': Postingcnt}
  console.log(json)
  var newPostkey =postingref.push(json).getKey(); //text: 게시물 내용 posting_id: 게시글 번호
  json.key = newPostkey
  res.send(json);//json 형식으로 html에 보냄
});

//게시물 리로드하는 ajax
app.post('/api/view',function(red,res){
  var json;
  var database = firebase.database();
  var postingref = database.ref('/');
  postingref.on("value", function (data) {
    json = data.val() //모든 게시물 읽어옴

  });
  res.send(json); //json 형식으로 html에 보냄
})

