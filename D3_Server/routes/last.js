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
    var id = req.query.id;
    var request = 'SELECT * FROM my_db.apr_petitions;';
    var request2 = 'SELECT * FROM my_db.apr_bill_data_2;';
    var request3 = 'SELECT title,keyword1, keyword2, keyword3, slug FROM my_db.apr_pet_key;';

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
                            res.render('navi', {
                                petkeyword:petkeyword,
                                test: petitions,
                                results: results,
                                energy: sankeypet,
                                id:JSON.stringify(id)
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

router.post('/pet', function(req, res, next) {
    var keyword = req.body.keyword;
        var request = 'SELECT * FROM my_db.apr_sim_news WHERE keyword="' + keyword + '"limit 5;';
        var request2 = 'SELECT * FROM my_db.apr_sim_jud WHERE keyword="' + keyword + '"limit 5;';
        var request3 = 'SELECT keyword, title, sim FROM my_db.apr_sim_law WHERE keyword="' + keyword + '"limit 5;';

    
    connection.query(request, function (error, results) {
        if (error) {
            console.log(error);
        } else {
            var simnews = JSON.stringify(results);
            connection.query(request2, function (error, results) {
                if (error) {
                    console.log(error);
                } else {
                    var simjud = JSON.stringify(results);
                    connection.query(request3, function(error, results){
                        if (error) {
                            consosle.log(error);
                        }
                        else {
                            var simlaw = JSON.stringify(results);
                            res.send({
                                simnews:simnews,
                                simjud: simjud,
                                simlaw: simlaw
                                });
                            
                        }
                    })
                }
            });
        }
    });
});

module.exports = router;
