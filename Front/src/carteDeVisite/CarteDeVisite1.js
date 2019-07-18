import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../CSS/Carte.css';

class CarteDeVisite1 extends Component {
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
        <div className="cadreCarte1">
          <div><img src={Photo} alt="" width="250px" heigth="150px" /></div>
          <div><div><span>Nom: </span>{Nom}</div><br /><div><span>Prénom: </span>{Prenom}</div><br /><div><span>Poste: </span>{Poste}</div><br /></div>
          <div><div><span>Email: </span>{Mail}</div><span>Tel :</span> {Tel}</div>
          <div><span>Société: </span>{Societe}&nbsp;</div><div><span>Slogan: </span>{Slogan}</div>
          <div><div><span>N° de Siret: </span>{Siret}</div></div>
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

export default connect(mapStateToProps)(CarteDeVisite1);

