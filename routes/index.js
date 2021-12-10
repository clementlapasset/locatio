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

router.post('/sign-up-landlord', async function (req, res) {

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
      landlord: req.body.landlord,
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

router.post('/sign-up-tenant', async function (req, res) {
  var result = false
  var saveUser = null

  var newUser = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    landlord: req.body.landlord
  })
  saveUser = await newUser.save()
  if (saveUser) {
    result = true
  }

  res.json({ result, saveUser })
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


// router.get('/finance', async function (req, res) {

//     var financeListCharges = await financeModel.find()

//     res.json(financeListCharges)

// })
// __________ Récupération de la base de données pour affichage dans les <Accordion> -- Alex __________ \\
// router.get('/document', async function (req, res) {

//   var documents = await documentModel.find();
//   console.log(documents)
//   res.json(documents)
// })


  //  __________ Route qui gère l'upload de fichier + sauvegarde dans un répertoire du backend -- Alex __________ \\
  router.post('/upload-file', async function (req, res) {
    var documentName = '/Users/alex/Desktop/locatio/files/' + uniqid() + '.pdf';
    var document = await req.files.document
    document.mv(documentName)
    console.log(document)

//  __________ Route qui gère le download de fichier vers le front-end -- Alex __________ \\
// router.get('/download-file', async function (req, res) {
  
//   var filePath = await documentModel.findById(idDocument);
//   console.log("-----------------  " + filePath.url + " -----------------")

//   fs.readFile(filePath.url, function (err, data) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(data)
//       res.contentType("application/pdf");
//       res.send(data);
//     }
//   });
// });

  })
  //  __________ Route qui gère le download de fichier vers le front-end -- Alex __________ \\
  router.get('/download-file', async function(req, res) {
    var filePath = await documentModel.findOne();
    console.log("-----------------  " + filePath.url + " -----------------")
 
    fs.readFile(filePath.url, function(err, data) {
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
    type: req.body.typeFromFront,
    montant: req.body.amountFromFront,
    description: req.body.descriptionFromFront,
    dateDebut: req.body.dateDebutFromFront,
    frequence: req.body.frequencyFromFront,
    regulariserCharge: req.body.totalChargesFromFront,
    regulariserProvision: req.body.totalProvisionsFromFront,
    Paiement: req.body.paymentFromFront,
  })
  saveFinance = await newFinance.save()

  if (saveFinance) {
    res.json(saveFinance)
  } else {
    res.json({ result: false })
  }

})

module.exports = router;
