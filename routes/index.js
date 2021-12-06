var express = require('express');

var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {

res.render('index', { title: 'Locatio back-end test maj super pizza' });

});

router.post('/sign-up', function (req, res) {

let firstname = req.body.firstname;

let lastname = req.body.lastname

let email = req.body.email

let password = req.body.password

if(firstname && lastname && email && password){

res.json({result: true });

}else{

res.json({result: false });

}

});

router.post('/sign-in', function (req, res) {

let email = req.body.email

let password = req.body.password

if(email && password){

res.json({result: true });

}else{

res.json({result: false });

}

});

router.post('/property-info', function (req, res){

let surface = req.body.surface

let numberRooms = req.body.numberRooms

if(surface && numberRooms){

res.json({result: true });

}else{

res.json({result: false });

}

} )

module.exports = router;


module.exports = router;
