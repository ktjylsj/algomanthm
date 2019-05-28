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
router.get('/', function (req, res, next) {
    var request = 'SELECT * FROM my_db.apr_petitions;';
    var request2 = 'SELECT * FROM my_db.apr_bill_data_2;';
    var request3 = 'SELECT title,keyword1, keyword2, keyword3 FROM my_db.apr_pet_key;';

    connection.query(request, function (error, results) {
        if (error) {
            console.log(error);
        } else {
            var petitions = JSON.stringify(results);
            connection.query(request2, function (error, results) {
                if (error) {
                    console.log(error);
                } else {
                    var sankeypet = JSON.stringify(results);
                    connection.query(request3, function(error, results){
                        if (error) {
                            consosle.log(error);
                        }
                        else {
                            var petkeyword = JSON.stringify(results);
                            res.render('test', {
                                petkeyword:petkeyword,
                                test: petitions,
                                results: results,
                                energy: sankeypet
                    });
                            
                        }
                    })
                }
            });
        }
    });
});

router.post('/', function(req, res, next) {  
    var keyword = req.body.keyword;
    var request = 'SELECT * FROM my_db.apr_bill_data WHERE title="' + keyword + '"limit 50;';
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
