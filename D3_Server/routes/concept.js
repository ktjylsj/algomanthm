var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'223.194.46.103',
    user:'guest',
    password:'1q2w3e4r!',
    database:'my_db'
});
/* GET home page. */
router.get('/', function(req, res, next) {
    var request1 = 'SELECT * FROM my_db.ditems';
    var request2 = 'SELECT * FROM my_db.theme';
    var request3 = 'SELECT * FROM my_db.articles';
    connection.query(request1, function(error, results){
        if(error){
            console.log(error);
        }
        else{
            var test1 = JSON.stringify(results);
            connection.query(request2, function(error, results){
                if(error){
                    console.log(error);
                }
                else{
                    var test2 = JSON.stringify(results);
                    connection.query(request3, function(error, results){
                        if(error){
                            cosole.log(error);
                        }
                        else{
                            test3 = JSON.stringify(results);
                            res.render('concept', {test1:test1, test2:test2, test3:test3});
                        }
                    })
                }
            })
        }
    })
});

module.exports = router;