var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // title 이라는 이름의 인자
  res.render('test', { title: '변수이름은 title' });
});

module.exports = router;
