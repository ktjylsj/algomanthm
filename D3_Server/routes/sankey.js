var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'223.194.46.103',
    user:'guest',
    password:'1q2w3e4r!',
    database:'my_db'
});
    connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
    var request = 'SELECT * FROM my_db.law_data_2;';
    connection.query(request,function(error,results){
        if(error){
            console.log(error);
        }
        else {
            var test = JSON.stringify(results);
            res.render('sankey',{results:results, energy:test});
        }
    });
});

module.exports = router;
