import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../CSS/Carte.css';
import logo from '../Logo.png';


class CarteDeVisite6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Nom: props.Nom,
      Prenom: props.Prenom,
      Poste: props.Poste,
      Societe: props.Societe,
      Slogan: props.Slogan,
      Siret: props.Siret,
      Tel: props.Tel,
      Mail: props.Mail,
      Photo: props.Photo
    };
  }

  render() {
    const { Nom, Prenom, Poste, Societe, Slogan, Siret, Tel, Mail, Photo } = this.props;
    return (
      <div className="cadreCarte">
        <div><img className="floatCarte" src={logo} alt="" width="200px" heigth="150px"/></div>
        <div><span>Non de la Société: {Societe}</span><span>{Slogan}</span></div>
        <div><span>Nom: {Nom}</span><span>Prénom: {Prenom}</span><span>Poste:{ Poste}</span></div>
        <div><span>Tel: {Tel}</span><span>Email: {Mail}</span></div>
        <div><span>N° de Siret{Siret}</span></div>
      </div>
    );
  } 
}

const mapStateToProps = (store) => ({
  Nom: store.auth.nomProfile,
  Prenom: store.auth.prenomProfile,
  Poste: store.auth.posteProfile,
  Societe: store.auth.societeProfile,
  Slogan: store.auth.sloganProfile,
  Siret: store.auth.siretProfile,
  Tel: store.auth.telProfile,
  Mail: store.auth.mailProfile,
  Photo: store.auth.photoProfile
})

export default connect(mapStateToProps)(CarteDeVisite6);