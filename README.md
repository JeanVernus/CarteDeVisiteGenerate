
# Présentation de la fonctionnalité

## Site de generation de carte de visite.

Je propose ici une interface web simple permettant de généré des cartes de visite après avoir rentré quelques informations dans un formulaire et d'y avoir ajouter une photo ou un logo.
Plus une interface admin pour re-styliser les cartes de visite aléatoires ( en cours de développement)

### Technos utilisées

1. React
1. JavaScript
1. Semantic-ui
1. Npm
1. Nodemailer
1. Node.js
1. MySql/PhpMyAdmin
1. Multer

### Module NPM

* Semantic-ui-rect
* SweetAlert2
* Multer
* Express
* Redux
* Axios
* React-router-dom
* Noty
* node-sass

# Installation

1. clône le respository gitHub : https://github.com/JeanVernus/CarteDeVisiteGenerate

1. #### Installer npm et ces dépendences dans le /Front et /Back
      . npm install
1. #### installer nodemon en global
      . npm i nodemon -g
1. #### installer sql my server
      . apt update
      . apt install mysql-server
1. #### installer et configurer phpmyadmin
      . apt install -g phpmyadmin
      . suivez les instructions pour configurer simplement phpmyadmin en localhost
      . importer dans votre nouvel bases de donner le fichier Users.sql que vous trouverez dans ce package
      . enfin modifier le fichier configMySql.js dans le back de se package par les informations rentrées pendant la                   configuration de votre base de données phpmyadmin
1. #### Lancer le server
      . nodemon index.js
1. #### Lancer le programme
      .npm start