/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Form, Input, Button, Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Noty from 'noty';
import CarteDeVisite1 from '../carteDeVisite/CarteDeVisite1';
import CarteDeVisite2 from '../carteDeVisite/CarteDeVisite2';
import CarteDeVisite3 from '../carteDeVisite/CarteDeVisite3';
import CarteDeVisite4 from '../carteDeVisite/CarteDeVisite4';
import CarteDeVisite5 from '../carteDeVisite/CarteDeVisite5';
import CarteDeVisite6 from '../carteDeVisite/CarteDeVisite6';


class Profil extends Component {
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
      Photo: props.Photo,
      generate: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.generateCarte = this.generateCarte.bind(this);
    this.postImage = this.postImage.bind(this);
  }

  handleChange(event, key) {
    this.setState({ [event.target.name]: event.target.value });
    if (key === 'Nom') { this.setState({ Nom: event.target.value }); }
    if (key === 'Prenom') { this.setState({ Prenom: event.target.value }); }
    if (key === 'Poste') { this.setState({ Poste: event.target.value }); }
    if (key === 'Societe') { this.setState({ Societe: event.target.value }); }
    if (key === 'Slogan') { this.setState({ Slogan: event.target.value }); }
    if (key === 'Siret') { this.setState({ Siret: event.target.value }); }
    if (key === 'Tel') { this.setState({ Tel: event.target.value }); }
    if (key === 'Mail') { this.setState({ Mail: event.target.value }); }
    if (key === 'Photo') { this.setState({ Photo: event.target.value }); }
  }

  handleFileChange(event, key) {
    console.log('event.target.files', event.target.files[0]);
    this.setState({ [event.target.name]: event.target.files[0] });
    if (key === 'Photo') { this.setState({ Photo: event.target.files[0] }); }
  }

  updateProfile(event) {
    event.preventDefault();
    Axios.post('http://localhost:7770/updateProfile', this.state)
      .then(res => {
        if (res.data.string === 'updateOk') {
          new Noty({
            text: 'Information enregistrées',
            type: 'success',
            theme: 'sunset',
            timeout: 2000,
          }).show();
        }
      })
      .catch(err => {
        new Noty({
          text: 'Un problème est survenue',
          type: 'error',
          theme: 'sunset',
          timeout: 2000,
        }).show();
      });
  }

  postImage(event) {
    event.preventDefault();
    const { Mail } = this.props;
    const { Photo } = this.state;
    const file = new FormData();
    file.append('file', Photo);
    Axios.post(`http://localhost:7770/sendImage?Mail=${Mail}`, file)
      .then(res => {
        if (res.data.string === 'uploadOk') {
          this.setState({ Photo: res.data.req });
          new Noty({
            text: 'Image enregistrée',
            type: 'success',
            theme: 'sunset',
            timeout: 2000,
          }).show();
        }
      });
  }

  generateCarte() {
    this.setState({ generate: true });
  }

  reload() {
    window.location.reload();
  }

  render() {
    const {
      Nom, Prenom, Poste, Societe, Slogan, Siret, Tel, Mail, Photos
    } = this.props;
    const { Photo } = this.state;
    console.log('this.props.Photo', Photos);
    console.log('this.state.Photo', Photo);
    const { generate } = this.state;
    if (generate === false) {
      return (
        <div>
          <h2 className="Profil"> Profil </h2>
          <div>
            <div><img src={Photo} alt="this.state" /></div>
            <Form className="formProfil" onSubmit={this.updateProfile}>
              <Form.Group>
                <Form.Input className="blockProfil" label="Nom: " placeholder={Nom} onChange={event => this.handleChange(event, 'Nom')} />
                <Form.Input className="blockProfil" label="Prénom: " placeholder={Prenom} onChange={event => this.handleChange(event, 'Prenom')} />
                <Form.Input className="blockProfil" label="Poste: " placeholder={Poste} onChange={event => this.handleChange(event, 'Poste')} />
              </Form.Group>
              <Form.Group>
                <Form.Input className="blockProfil" label="Société: " placeholder={Societe} onChange={event => this.handleChange(event, 'Societe')} />
                <Form.Input className="blockProfil" label="Slogan: " placeholder={Slogan} onChange={event => this.handleChange(event, 'Slogan')} />
              </Form.Group>
              <Form.Group>
                <Form.Input className="blockProfil" label="Siret: " placeholder={Siret} onChange={event => this.handleChange(event, 'Siret')} />
                <Form.Input className="blockProfil" label="Tel: " placeholder={Tel} onChange={event => this.handleChange(event, 'Tel')} />
                <Form.Input className="blockProfil" label="Mail: " placeholder={Mail} onChange={event => this.handleChange(event, 'Mail')} />
              </Form.Group>
              <Button type="submit" color="teal" animated>
                <Button.Content visible>Soumettre</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Form>
            <Form onSubmit={this.postImage}>
              <Form.Input type="file" onChange={event => this.handleFileChange(event, 'Photo')} />
              <Button type="submit" color="teal">Image</Button>
            </Form>
          </div>
          <div className="centrerButton">
            <Button className="generate" onClick={this.generateCarte} color="teal" animated>
              <Button.Content visible><h2>Générer</h2></Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </div>
          <Button type="submit" color="teal" animated onClick={this.reload}>
            <Button.Content visible>
              Retour
            </Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </div>
      );
    }
    return (
      <div className="displayCarte">
        <div><CarteDeVisite1 /></div><div><CarteDeVisite2 /></div>
        <div><CarteDeVisite3 /></div><div><CarteDeVisite4 /></div>
        <div><CarteDeVisite5 /></div><div><CarteDeVisite6 /></div>
        <div>
          <Button type="submit" color="teal" animated onClick={this.reload}>
            <Button.Content visible>
              Retour
            </Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </div>
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
  Photos: store.auth.photoProfile
});

export default connect(mapStateToProps)(Profil);
