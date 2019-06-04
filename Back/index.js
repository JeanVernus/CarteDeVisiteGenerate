const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mySql = require("mysql");
const config = require("./configMySql.js")
const bcrypt = require('bcrypt');

const port = 7770;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  console.log("req.body", req.body);
  const Password = bcrypt.hashSync(req.body.Password, 10);
  const addUsers = `INSERT INTO Users (Identifiant, Email, Password) VALUES (${mySql.escape(req.body.Identifiant)}, ${mySql.escape(req.body.Email)}, ${mySql.escape(Password)})`
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
  console.log(req.body);
  const Password = req.body.Password;
  const loginUser = `SELECT * FROM Users WHERE Email = ${mySql.escape(req.body.Email)}`
  config.query(loginUser, (err, resultLogUser) => {
    if (JSON.stringify(resultLogUser).indexOf('1') > 0) {
      console.log('resultLogUser', resultLogUser);
      const newSql = `SELECT * FROM Users WHERE Email = ${mySql.escape(req.body.Email)}`
      config.query(newSql, (err, resultLogUser) => {
        if (bcrypt.compareSync(Password, resultLogUser[0].Password)) {
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
        else if (resultLogUser[0].Email !== req.body.Email) {
          res.status(200).json(
            'badMail')
        }
        else {
          res.status(300).json('err')
        }
      })
    }
  })
})

app.post('/updateProfile', (req, res) => {
  console.log(req.body);
  const Mail = req.body.Mail;
  const updateProfile = `UPDATE Users SET 
    Nom = ${mySql.escape(req.body.Nom)},
    Prenom = ${mySql.escape(req.body.Prenom)},
    Poste = ${mySql.escape(req.body.Poste)},
    Societe = ${mySql.escape(req.body.Societe)},
    Slogan = ${mySql.escape(req.body.Slogan)},
    Siret = ${mySql.escape(req.body.Siret)},
    Telephone = ${mySql.escape(req.body.Tel)}
    WHERE Email = ${mySql.escape(Mail)}`

  config.query(updateProfile, (err, resultUpdateProfile) => {
    console.log('resultUpdateProfile', resultUpdateProfile);
    if (err) {
      console.log(err);
    }
    console.log('resultChange', resultUpdateProfile);
    res.status(200).json({
      string: "updateOk",
      result: resultUpdateProfile
    });
  })
})

app.listen(port, () => { console.log(`server started on ${port}`); })