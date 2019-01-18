var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'39.120.184.198',
    user:'guest',
    password:'1q2w3e4r!',
    database:'my_db'
});
    connection.connect();
/* GET home page. */
router.get('/', function(req, res, next) {
    var request = 'SELECT * FROM my_db.law_data WHERE title = "동물"';
    connection.query(request, function(error, results){
        if(error){
            console.log(error);
        }
        else{
            var test = JSON.stringify(results);
            res.render('time', {test:test});
        }
    })
});

module.exports = router;
