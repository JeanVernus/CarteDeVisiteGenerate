import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../CSS/Carte.css';

class CarteDeVisite4 extends Component {
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
      <div className="cadreCarte4">
        <div><img src={Photo} alt=""/></div>
        <div><span>Non de la Société: </span>{Societe}<span>Slogan: </span>{Slogan}</div>
        <div><span>Nom: </span>{Nom}<span>Prénom: </span>{Prenom}<span>Poste: </span>{ Poste}</div>
        <div><span>Tel: </span>{Tel}<span>Email: </span>{Mail}</div>
        <div><span>N° de Siret: </span>{Siret}</div>
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

export default connect(mapStateToProps)(CarteDeVisite4);