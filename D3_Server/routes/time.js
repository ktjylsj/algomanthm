var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    //host:'localhost',
    //user:'root',
    //password:'20150303jj',
    //database:'mydb'
    //host:'39.120.184.198',
    //user:'guest',
    //password:'1q2w3e4r!',
    //database:'my_db'
    host:'223.194.46.103',
    user:'guest',
    password:'1q2w3e4r!',
    database:'my_db'
});
    connection.connect();
/* GET home page. */
router.get('/', function(req, res, next) {
    var request = 'SELECT * FROM my_db.law_data WHERE title = "동물";';
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

router.get('/:idx', function(req,res){
    var idx = req.params.idx;
    var request = 'SELECT * FROM my_db.law_data WHERE name like "' + idx + '%";';
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

router.post('/', function(req, res, next) {  
    var keyword = req.body.keyword;
    var request = 'SELECT * FROM my_db.apr_bill_data WHERE title LIKE"' + keyword + '%"limit 200;';
    console.log(request)
    connection.query(request,function(error,results){
        if(error){
            console.log(error);
        }
        else {
            var test = JSON.stringify(results);
            res.send(results);
        }
    });
});

module.exports = router;
