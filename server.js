var express = require('express');
var mysql = require('./db.js');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5624);

//home page
app.get('/',function(req,res){
  res.render('home');
});

//insert a record into the table `TODO`
app.post('/addTODO',function(req,res,next){
  //test log
  console.log(req.body)
  mysql.pool.query("INSERT INTO TODO (`Name`, `Urgency`, `Date`) VALUES (?,?,?)", 
    [req.body.todoName, req.body.todoUrgency,req.body.todoDate], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.send();
  });
});

//this should insert a record to the table test
app.get('/dbtest',function(req,res,next){
  mysql.pool.query("INSERT INTO test (`someInt`) VALUES (?)",1, function(err, result){
    if(err){
      next(err);
      return;
    }
    console.log("A record has been inserted to table test");
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});