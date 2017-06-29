var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mysql = require('mysql');

app.use(bodyparser.json());

var pool = mysql.createPool({
	connectionLimit: 50,
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'passwordstorer'
});

app.use(express.static(__dirname + "/public"));

app.post('/insert', function(req, res){
  console.log(req.body);
  pool.getConnection(function(err, connection){
		if (err) {
          connection.release();
          throw err;
    }
  	connection.query('INSERT INTO data SET ?', req.body, function(err, rows, fields){
			if(!err){
    		console.log(rows);
        res.json("Data Inserted");
        connection.release();
			}
		  else{
				console.log(err);
			}
  	});
	});
});

app.get("/getData", function(req, res){
	pool.getConnection(function(err, connection){
		if (err) {
					connection.release();
					throw err;
		}
		connection.query('SELECT * FROM data',  function(err, rows, fields){
			if(!err){
				console.log(rows);
        res.json(rows);
  			connection.release();
			}
			else{
				console.log("error");
			}

		});
	});
});

app.listen(5432);
console.log("Listening to port 5432");
