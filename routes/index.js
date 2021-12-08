var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
var propertyModel = require('../models/properties')
var documentModel = require('../models/documents')
var financeModel = require('../models/finances')
var uid2 = require('uid2')
var bcrypt = require('bcrypt');
var uniqid = require('uniqid');
var fs = require('fs');

/* GET home page. */

router.get('/', function (req, res, next) {

  res.render('index', { title: 'Locatio back-end test maj super pizza' });

});

router.post('/sign-up', async function (req, res) {

  var error = []
  var result = false
  var saveUser = null
  var token = null

  const data = await userModel.findOne({
    email: req.body.email
  })

  if (data != null) {
    error.push('Utilisateur déjà présent')
  }

  if (req.body.firstName == ''
    || req.body.lastName == ''
    || req.body.email == ''
    || req.body.password == ''
  ) {
    error.push('Champs vides')
  }

  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.password, 10);
    var newUser = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      token: uid2(32),
    })
    saveUser = await newUser.save()
    if (saveUser) {
      result = true
      token = saveUser.token
    }
  }

  res.json({ result, saveUser, error, token })

});

router.post('/sign-in', async function (req, res, next) {

  var result = false
  var user = null
  var error = []
  var token = null

  if (req.body.email == ''
    || req.body.password == ''
  ) {
    error.push('Champs vides')
  }

  if (error.length == 0) {
    user = await userModel.findOne({
      email: req.body.email
    })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        result = true
        token = user.token
      } else {
        result = false
        error.push('Mot de passe ou email incorrect')
      }
    } else {
      result = false
      error.push('Mot de passe ou email incorrect')
    }
  }


  res.json({ result, user, error, token })


})

router.post('/property-info', async function (req, res) {
  let propertyAddress = req.body.propertyAddress
  let surface = req.body.surface
  let numberRooms = req.body.numberRooms

  if (propertyAddress && surface && numberRooms) {
    var newProperty = new propertyModel({
      propertyAddress: req.body.propertyAddress,
      surface: req.body.surface,
      numberRooms: req.body.numberRooms
    })
    saveProperty = await newProperty.save()
    result = true
    res.json({ result, saveProperty });

  } else {
    res.json({ result: false });
  }
})


router.get('/finance/:type', async function (req, res) {

  if (req.params.type === 'charges') {
    var financeListCharges = await financeModel.find({ type: ['charge', 'provision'] })
    console.log(financeListCharges)
    res.json(financeListCharges)

  } else {
    res.json({ result: 'nothing found' })
  }
})

  router.get('/document', async function (req, res) {

    var documents = await documentModel.find();

    res.json(documents)
  })

  // router.post('/document-add', async function (req, res) {

  //   var newDocument = new documentModel({
  //     type: req.body.type,
  //     title: req.body.title,
  //     url: req.body.url,
  //     date: req.body.date

  //   });
  //   var documentSaved = await newDocument.save();
    
  // })

  router.post('/upload-file', async function (req, res) {
    var documentName = './files/' + uniqid() + '.pdf';
    var document = await req.files.document
    document.mv(documentName)
    console.log(document)

    var newDocument = new documentModel({
      type: req.body.type,
      title: req.body.title,
      url: documentName,
      date: req.body.date

    });
    var documentSaved = await newDocument.save();
    console.log(documentSaved)
    res.json(document)

  })

  router.get('/download-file', async function(req, res) {
    var filePath = await documentModel.findOne();
    console.log("-----------------  " + filePath.url + " -----------------")
 
    fs.readFile('/Users/alex/Desktop/locatio/routes/1gqshwrkdkwxk44wg.pdf', function(err, data) {
      if(err){
        console.log(err)
      }else{
        console.log(data)
        res.contentType("application/pdf");
        res.send(data);
      }
    });
 });
 



  router.post('/finance', async function (req, res) {

    var newFinance = new financeModel({
      type: req.body.type,
      montant: req.body.montant,
      description: req.body.description,
      dateDebut: req.body.startDate,
      dateFin: req.body.endDate,
      frequence: req.body.frequence
    })
    saveFinance = await newFinance.save()

    if (saveFinance) {
      res.json({ result: true })
    } else {
      res.json({ result: false })
    }

  })

  module.exports = router;
