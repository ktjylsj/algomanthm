var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createPool({
    host: '223.194.46.103',
    user: 'guest',
    password: '1q2w3e4r!',
    database: 'my_db'
});

/* GET home page. */

router.post('/', function(req, res, next) {
    var keyword = req.body.keyword;
    console.log(keyword);
    var request1;
    var request2;
    var request3;
        request1 = 'SELECT * FROM my_db.apr_sim_news WHERE keyword="' + keyword + '"limit 5;';
    
        request2 = 'SELECT * FROM my_db.apr_sim_jud WHERE keyword="' + keyword + '"limit 5;';
    
        request3 = 'SELECT keyword, title, sim FROM my_db.apr_sim_law WHERE keyword="' + keyword + '"limit 5;';

    
    connection.query(request,function(error,results){
        if(error){
            console.log(error);
        }
        else {
            console.log(results);
            var test = JSON.stringify(results);
            res.send(results);
        }
    });
});

module.exports = router;
