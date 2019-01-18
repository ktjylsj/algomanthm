var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'20150303jj',
    database:'mydb'
});
/* GET home page. */
router.get('/', function(req, res, next) {
    var request = 'SELECT * FROM mydb.law_data WHERE title = "동물"';
    connection.query(request, function(error, results){
        if(error){
            console.log(error);
        }
        else{
            var test = JSON.stringify(results);
            res.render('fram1', {test:test});
        }
    })
});

module.exports = router;
