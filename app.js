const express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
  const ejs = require('ejs');
  const fs = require("fs");

 var files=require('./routes/files');
  var contactus = require('./routes/contactus');
  var feedback = require('./routes/feedback');
  var quizes =require('./routes/quizes');
  var mail=require('./routes/mail');
//const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const mysql      = require('mysql');
let bodyParser=require("body-parser");
let connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : 'Pass',
              database : 'test'
            });
connection.connect();
global.db = connection; 
// all environments
app.set('port', process.env.PORT || 7000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))
app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile',user.profile);//to render users profile
app.get('/contactus',contactus);
app.get('/feedback',feedback);
app.listen(7000)

app.get('/usertimetable',(req, res) => {
  let sql = "SELECT * FROM timetable";
  let query = connection.query(sql, (err, rows) => {
      if(err) throw err;
      res.render('usertimetable', {
          title : 'Time Table',
          timetable : rows}); });});
        
 app.get('/usernotice',(req, res) => {
    let sql = "SELECT * FROM notice";
    let query = connection.query(sql, (err, rows) => {
    if(err) throw err;
    res.render('usernotice', {
    notice : rows}); });});

app.get('/timetable',(req, res) => {
  let sql = "SELECT * FROM timetable";
  let query = connection.query(sql, (err, rows) => {
      if(err) throw err;
      res.render('timetable', {
          title : 'Time Table',
          timetable : rows}); });});

app.get('/timetable/edit/:tid',(req, res) => {
  const tid = req.params.tid;
  let sql = `Select * from timetable where tid = ${tid}`;
  let query = connection.query(sql,(err, result) => {
      if(err) throw err;
      res.render('timetable_edit', {
          title : 'Time Table',
          timetable : result[0] });});});

app.post('/update',(req, res) => {
  const tid = req.body.tid;
  let sql = "update timetable SET time='"+req.body.time+"', monday='"+req.body.monday+"', tuesday='"+req.body.tuesday+"', wednesday='"+req.body.wednesday+"', thursday='"+req.body.thursday+"', friday='"+req.body.friday+"', saturday='"+req.body.saturday+"' where tid ="+tid;
  let query = connection.query(sql,(err, results) => {
    if(err) throw err;
    res.redirect('/timetable');
  });
});

app.get('/user_index',(req, res) => {
  let sql = "SELECT * FROM users";
  let query = connection.query(sql, (err, rows) => {
      if(err) throw err;
      res.render('user_index', {
          title : 'User List',
          users : rows      });  });});

app.get('/user_index/add',(req, res) => {
  res.render('user_add', {
      title : 'Add User'  });});

app.post('/save',(req, res) => { 
  let data = {first_name: req.body.first_name,last_name: req.body.last_name, mob_no: req.body.mob_no, user_name: req.body.user_name, password: req.body.password};
  let sql = "INSERT INTO users SET ?";
  let query = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/user_index'); });});

app.get('/user_index/edit/:userId',(req, res) => {
  const userId = req.params.userId;
  let sql = `Select * from users where id = ${userId}`;
  let query = connection.query(sql,(err, result) => {
      if(err) throw err;
      res.render('user_edit', {
          title : 'Edit User Details',
          user : result[0]  });  });});

app.post('/user_index/update',(req, res) => {
  const userId = req.body.id;
  let sql = "update users SET first_name='"+req.body.first_name+"',last_name='"+req.body.last_name+"',  mob_no='"+req.body.mob_no+"',  user_name='"+req.body.user_name+"' where id ="+userId;
  let query = connection.query(sql,(err, results) => {
    if(err) throw err;
    res.redirect('/user_index'); });});

app.get('/user_index/delete/:userId',(req, res) => {
  const userId = req.params.userId;
  let sql = `DELETE from users where id = ${userId}`;
  let query = connection.query(sql,(err, result) => {
      if(err) throw err;
      res.redirect('/user_index');});});

app.get('/feedback/ravi',(req, res) => { res.render('ravi');});
app.get('/feedback/madhura',(req, res) => { res.render('madhura');});
app.get('/feedback/vishal',(req, res) => { res.render('vishal');});
app.get('/feedback/kishori',(req, res) => { res.render('kishori');});
 
app.get('/notice',(req, res) => {
  let sql = "SELECT * FROM notice";
  let query = connection.query(sql, (err, rows) => {
      if(err) throw err;
      res.render('notice', {
          notice : rows });  }); });

app.get('/notice/add',(req, res) => {
  res.render('notice_add', {
      title : ''  });});

app.post('/notice/save',(req, res) => { 
  let data = {publisheddate: req.body.publisheddate, title: req.body.title, content: req.body.content};
  let sql = "INSERT INTO notice SET ?";
  let query = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/notice');});});

app.get('/notice/edit/:nid',(req, res) => {
  const nid = req.params.nid;
  let sql = `Select * from notice where nid = ${nid}`;
  let query = connection.query(sql,(err, result) => {
      if(err) throw err;
      res.render('notice_edit', {
          title : '',
          user : result[0]      });  });});

app.post('/notice/update',(req, res) => {
  const nid = req.body.nid;
  let sql = "update notice SET publisheddate='"+req.body.publisheddate+"',  title='"+req.body.title+"',  content='"+req.body.content+"' where nid ="+nid;
  let query = connection.query(sql,(err, results) => {
    if(err) throw err;
    res.redirect('/notice');  });});

app.get('/notice/delete/:nid',(req, res) => {
  const nid = req.params.nid;
  let sql = `DELETE from notice where nid = ${nid}`;
  let query = connection.query(sql,(err, result) => {
      if(err) throw err;
      res.redirect('/notice');  });});


app.get('/quizes', quizes);
app.get('/mail',mail);
app.get('/quizes/JAVA', (req, res)=>{
  res.render('JAVA')
});

app.get('/quizes/c',(req, res)=>{
res.render('c')
});

app.get('/quizes/Qindex',(req, res)=>{
  res.render('Qindex')
  });

  app.get('/quizes/Numbersys',(req, res)=>{
    res.render('Numbersys')
    });

    app.get('/quizes/numberseries',(req, res)=>{
      res.render('numberseries')
      });

    
      app.get('/quizes/Clock',(req, res)=>{
        res.render('Clock')
        });  
  

    app.get('/quizes/antonym',(req, res)=>{
      res.render('antonym')
      });

      app.get('/quizes/DecimalFraction',(req, res)=>{
        res.render('DecimalFraction')
        });


      app.get('/quizes/synonym',(req, res)=>{
        res.render('synonym')
        });

        app.get('/files',(req, res)=>{
          res.render('files')
          });


































































