/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Noty from 'noty';
import { Form, Button, Icon } from 'semantic-ui-react';
import Profil from './Profil';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      res: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
  }

  handleChange(event, key) {
    this.setState({ [event.target.name]: event.target.value });
    if (key === 'Email') { this.setState({ Email: event.target.value }); }
    if (key === 'Password') { this.setState({ Password: event.target.value }); }
  }

  sendLogin(event) {
    const { dispatch } = this.props;
    const { Email, Password } = this.state;
    event.preventDefault();
    Axios.post('http://localhost:7770/sendLogin', {
      Email,
      Password
    })
      .then(res => {
        dispatch({
          type: 'PROFILE',
          nomProfile: res.data.nomProfile,
          prenomProfile: res.data.prenomProfile,
          posteProfile: res.data.posteProfile,
          societeProfile: res.data.societeProfile,
          sloganProfile: res.data.sloganProfile,
          siretProfile: res.data.siretProfile,
          telProfile: res.data.telProfile,
          mailProfile: res.data.mailProfile,
          photoProfile: res.data.photoProfile,
        });
        if (res.data.string === 'passOK') {
          this.setState({
            res: res.data.string,
          });
          new Noty({
            text: 'Connexion réussie',
            type: 'success',
            theme: 'sunset',
            timeout: 2000,
          }).show();
        }
        if (res.data === 'badMail') {
          new Noty({
            text: 'Email et mot de passe ne correspondent pas',
            type: 'alert',
            theme: 'sunset',
            timeout: 2000,
          }).show();
        }
      })
      .catch(err => {
        new Noty({
          text: 'Erreur, mauvais mot de passe',
          type: 'error',
          theme: 'sunset',
          timeout: 2000,
        }).show();
      });
  }

  render() {
    const { res } = this.state;
    if (res === 'passOK') {
      return <div><Profil /></div>;
    }

    return (
      <div>
        <h2 className="connection">Connexion</h2>
        <div>
          <Form className="formLogin" onSubmit={this.sendLogin}>
            <Form.Group>
              <Form.Input className="blockLogin" label="Email: " placeholder="Email" name="Email" onChange={event => this.handleChange(event, 'Email')} />
              <Form.Input className="blockLogin" type="password" label="Mot de Pass: " placeholder="Mot de pass" name="Password" onChange={event => this.handleChange(event, 'Password')} />
            </Form.Group>
            <Button type="submit" color="teal" animated>
              <Button.Content visible>Soumettre</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
