const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mySql = require("mysql");
const config = require("./configMySql.js")
const bcrypt = require('bcrypt');
const multer = require('multer');

const port = 7770;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('sendImage'));

var storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'fileCard')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storageImage }).single('file')

app.post('/register', (req, res) => {
  console.log(req.body);
  const Password = bcrypt.hashSync(req.body.Password, 10);
  const addUsers = `INSERT INTO User (Identifiant, Email, Password) VALUES (${mySql.escape(req.body.Identifiant)}, ${mySql.escape(req.body.Email)}, ${mySql.escape(Password)})`
  config.query(addUsers, (err, resultAddUsers) => {
    if (err) {
      res.status(200).json('error')
    }
    else {
      res.status(200).json('register ok')
    }
    console.log(resultAddUsers);
  })
})

app.post('/sendLogin', (req, res) => {
  console.log('req.body', req.body);
  const Password = req.body.Password;
  const loginUser = `SELECT * FROM User WHERE Email = ${mySql.escape(req.body.Email)}`
  config.query(loginUser, (err, resultLogUser) => {
    if (JSON.stringify(resultLogUser).indexOf('1') > 0) {
      console.log('resultLogUser', resultLogUser);
      const checkPass = `SELECT * FROM User WHERE Email = ${mySql.escape(req.body.Email)}`
      config.query(checkPass, (err, resultcheckPass) => {
        if (bcrypt.compareSync(Password, resultcheckPass[0].Password)) {
          console.log('resultLogUser[0].Photo', resultLogUser[0].Photo,);     
          res.status(200).json({
            string: 'passOK',
            nomProfile: resultLogUser[0].Nom,
            prenomProfile: resultLogUser[0].Prenom,
            posteProfile: resultLogUser[0].Poste,
            societeProfile: resultLogUser[0].Societe,
            sloganProfile: resultLogUser[0].Slogan,
            siretProfile: resultLogUser[0].Siret,
            telProfile: resultLogUser[0].Telephone,
            mailProfile: resultLogUser[0].Email,
            photoProfile: resultLogUser[0].Photo,
          })
        }
        else {
          res.status(200).json('error')
        }
      })
    }
    else {
      res.status(200).json('error')
    }
  })
})

app.post('/sendImage', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    console.log('listfile', req.file.filename);
    console.log('Email', req.query.Mail);
    const insertImage = `UPDATE User SET Photo=${mySql.escape(req.file.filename)} WHERE Email=${mySql.escape(req.query.Mail)}`;
    config.query(insertImage, (err1, resultInsertImage) => {
      if (err1) {
        console.log(err1);
      }
      console.log('resultInsertImage', resultInsertImage);
    });
    return res.status(200).send(req.file.filename)
  })
})

app.post('/updateProfile', (req, res) => {
  console.log(req.body);
  const Mail = req.body.Mail;
  const updateProfile = `UPDATE User SET 
    Nom = ${mySql.escape(req.body.Nom)},
    Prenom = ${mySql.escape(req.body.Prenom)},
    Poste = ${mySql.escape(req.body.Poste)},
    Societe = ${mySql.escape(req.body.Societe)},
    Slogan = ${mySql.escape(req.body.Slogan)},
    Siret = ${mySql.escape(req.body.Siret)},
    Telephone = ${mySql.escape(req.body.Tel)},
    Photo =${mySql.escape(req.body.Photo)}
    WHERE Email = ${mySql.escape(Mail)}`

  config.query(updateProfile, (err, resultUpdateProfile) => {
    console.log('resultUpdateProfile', resultUpdateProfile);
    if (err) {
      console.log(err);
    }
    console.log('resultChange', resultUpdateProfile);
    res.status(200).json(resultUpdateProfile);
  })
})

app.listen(port, () => { console.log(`server started on ${port}`); })