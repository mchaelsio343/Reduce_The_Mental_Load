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
app.use('/static', express.static('public'));
//home page
app.get('/',function(req,res){
  //select all the records from table `TODO`
  var context={}
  mysql.pool.query('SELECT id ,Name,Urgency,DATE_FORMAT(Date,\'%m/%d/%Y %H:%i:%s\') AS Date,Category FROM `TODO` WHERE done = 0 ORDER BY Date',[true],function(err,results,feilds){
    if(err){
      res.write(JSON.stringify(err));
      res.end();
    }

    context.TODO = JSON.parse(JSON.stringify(results));
    mysql.pool.query('SELECT id, Name,Location,DATE_FORMAT(Date,\'%m/%d/%Y %H:%i:%s\') AS Date FROM `APPOINTMENT` WHERE done = 0 ORDER BY Date',[true],function(err,results,feilds){
      if(err){
         res.write(JSON.stringify(err));
          res.end();
      }
      
    context.APPOINTMENT = JSON.parse(JSON.stringify(results));
    mysql.pool.query('SELECT id, Name FROM `CATEGORY` WHERE Name IS NOT NULL ORDER BY id',[true],function(err,results,feilds){
      if(err){
        res.write(JSON.stringify(err));
        res.end();
      }

    context.CATEGORY = JSON.parse(JSON.stringify(results));
    console.log(context);
    res.render('home',context);

  });
        });
    });
});

//view completed items
app.get('/completeditems', function(req,res){
  var context={};
  mysql.pool.query('SELECT Name,DATE_FORMAT(Date,"%m/%d/%Y %H:%i:%s") AS Date FROM APPOINTMENT WHERE done = 1 ORDER BY Date',[true],function(err,results,feilds){
    if(err){
      res.write(JSON.stringify(err));
      res.end();
    }else{
      context.APPOINTMENT = JSON.parse(JSON.stringify(results));
      mysql.pool.query('SELECT Name,DATE_FORMAT(Date,"%m/%d/%Y %H:%i:%s") AS Date FROM TODO WHERE done = 1 ORDER BY Date',[true],function(err,results,feilds){
        if(err){
        res.write(JSON.stringify(err));
        res.end();
        }
        context.TODO = JSON.parse(JSON.stringify(results));
        console.log(context)
        res.render('completeditems',context);
      });
  }});
});

//insert a record into the table `TODO`
app.post('/addTODO',function(req,res,next){
  //test log
  console.log(req.body)
  mysql.pool.query("INSERT INTO TODO (`Name`, `Urgency`, `Date`, `Category`) VALUES (?,?,?,?)", 
    [req.body.todoName, req.body.todoUrgency,req.body.todoDate,req.body.todoCategory], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.send();
  });
});

//insert a record into the table `APPOINTMENT`
app.post('/addAPPOINTMENT',function(req, res, next){
  //test log
  console.log(req.body);
  mysql.pool.query("INSERT INTO APPOINTMENT (`Name`, `Location`, `Date`, `Description`) VALUES (?,?,?,?)",
    [req.body.appointmentName, req.body.appointmentLocation, req.body.appointmentDate, req.body.appointmentDescription], function(err, result){
    if (err){
      next(err);
      return;
    }
    res.send();
  });
});

//insert a record into the table `CATEGORY`
app.post('/addCategory',function(req, res, next){
  //test log
  console.log(req.body);
  mysql.pool.query("INSERT INTO CATEGORY (`Name`) VALUES (?)",
    [req.body.categoryName], function(err, result){
    if (err){
      next(err);
      return;
    }
    res.send();
  });
});

//mark one appointment as done
app.post('/markAppointment',function(req, res, next){
    console.log(req.body);
    mysql.pool.query("UPDATE APPOINTMENT SET done = 1 WHERE id = ?",
        [req.body.id], function(err, result){
            if (err){
                next(err);
                return;
            }
            res.send();
        });
});

//mark one TODO as done
app.post('/markTODO',function(req, res, next){
    console.log(req.body);
    mysql.pool.query("UPDATE TODO SET done = 1 WHERE id = ?",
        [req.body.id], function(err, result){
            if (err){
                next(err);
                return;
            }
            res.send();
        });
});

//delete one appointment as done
app.post('/deleteAppointment',function(req, res, next){
    console.log(req.body);
    mysql.pool.query("DELETE FROM APPOINTMENT WHERE id=?",
        [req.body.id], function(err, result){
            if (err){
                next(err);
                return;
            }
            res.send();
        });
});

//delete category
app.post('/deleteCategory',function(req, res, next){
    console.log(req.body);
    mysql.pool.query("DELETE FROM CATEGORY WHERE id=?",
        [req.body.id], function(err, result){
            if (err){
                next(err);
                return;
            }
            res.send();
        });
});

//delete one TODO as done
app.post('/deleteTODO',function(req, res, next){
    console.log(req.body);
    mysql.pool.query("DELETE FROM TODO WHERE id=?",
        [req.body.id], function(err, result){
            if (err){
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
