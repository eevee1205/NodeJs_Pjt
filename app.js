var express = require('express');  //express 모듈 시작
//http://expressjs.com  express 메뉴얼
//express 를 사용할때의 문법
var app = express(); //express 모듈 함수를 실행하면 애플리케이션을 리턴한다.
app.locals.pretty = true; //코드가 자동으로 보기좋게 들여씌워짐
//view engine 템블릿엔진 사용 명령어
app.set('view engine', 'jade');
app.set('views', './views'); //jade, 템플릿 파일은 views 폴더에 저장 기본디렉토리
app.get('/template', function(req, res){
  //렌더링하는방식  temp라는 템플릿파일을 웹페이지로 렌더링한다.
  //객체로 jade 에서 사용할 변수선언
  res.render('temp' , {time: Date(), _title: "제목!!!!!"});

});

//정적 파일 사용방법
app.use(express.static('public')); //디렉터리명

//홈페이지에 접속할 경우 get방식으로 접속한 사용자를 받는다.
app.get('/', function(req, res){
  res.send('Hello Express Home Page'); //접속성공하면 해당값을 res값으로 응답한다.
}); //사용자가 home 으로 get방식 접속하면 함수실행

///login 주소로 접속
app.get('/login', function(req, res){
  res.send('<h1>Login 페이지입니다.</h1>');
});

app.get('/route', function(req, res){
  res.send('Hello Router, <img src="/portfolio.png">');
});

//동적 html 사용
app.get('/dynamic', function(req, res){
  var list= '';
  for(var i=0; i<5; i++){
      list = list + '<li>coding</li>';
  }

  var time = Date();

  var output = `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, dynamic 파일입니다!!!!!!!!!!!!!
        <ul>
          ${list}
        </ul>
        ${time}
    </body>
  </html>`;

  res.send(output);
});


app.listen(3000, function(){
  console.log('Conneted 3000 port!!')
});  //listen 메소드에 포트 지정


/*사용자, router, controller 의 구조에서
  router : 사용자의 요청을  controller 에 중계해주는역할
*/

/*
  module : 프로그램안에서 부품처럼 사용되는 프로그램들
  Npm : Npm을 통해서 모듈들을 가져와 담아서 사용할수있다.
*/



//쿼리스트링
app.get('/topic', function(req, res){
  var topic = [
    'Love Is...',
    'Soccer Is...',
    'Fuck is...'
  ];

  var output = `
     <a href='/topic?id=0'>Love????</a><br/r>
     <a href='/topic?id=1'>Socer????</a><br/>
     <a href='/topic?id=2'>Fuck????</a><br/>

     ${topic[req.query.id]}
   `
  res.send(output);  //query.???  url 파라미터명
});


///topic/:id 시멘틱 URL 방식
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id + "+" + req.params.mode);
});

//post 방식 form
app.get('/form', function(req, res){
  res.render('form');
});

//submit ACtion
app.get('/form_receiver', function(req, res){
  var title = req.query.title;  //get방식의 query string 가져오기
  var description = req.query.description;

  res.send(title + ',' + description);
});



var bodyParser = require('body-parser');//bodyparser 모듈 생성
app.use(bodyParser.urlencoded({ extended: false }))//post방식 사용시 bodyParser 모듈 사용

app.post('/form_receiver', function(req, res){//submit ACtion

  var title = req.body.title;  //post방식의 form데이터 가져오기
  var description = req.body.description;

  res.send(title + ',' + description);

});
