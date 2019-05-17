import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import Axios from 'axios';
import Noty from 'noty';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Identifiant: "",
      Password: "",
      Email: "",
      Confirm: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.postRegister = this.postRegister.bind(this);
  }

  handleChange(event, key) {
    this.setState({ [event.target.name]: event.target.value });
    if (key === 'Identifiant') { this.setState({ Identifiant: event.target.value }); }
    if (key === 'Password') { this.setState({ Password: event.target.value }); }
    if (key === 'Confirm') { this.setState({ Comfirm: event.target.value }); }
    if (key === 'Email') { this.setState({ Email: event.target.value }); }
  }

  postRegister(event) {
    const { Confirm, Password, Identifiant, Email } = this.state;
    event.preventDefault();
    if (Confirm === Password) {
      Axios.post('http://localhost:7770/register', {
        Identifiant,
        Password,
        Email
      })
        .then(res => {
          if (res.data === "register ok") {
            new Noty({
              text: 'Enregistrement effectué',
              type: 'success',
              theme: 'sunset',
              timeout: 2000,
            }).show();
          }
          if (res.data === "error") {
            new Noty({
              text: 'Email déjà utilisé',
              type: 'warning',
              theme: 'sunset',
              timeout: 2000,
            }).show();
          }
          console.log(res);
        });
    }
    else {
      new Noty({
        text: 'Erreur, mauvais mot de passe',
        type: 'error',
        theme: 'sunset',
        timeout: 2000,
      }).show();
    }
  }

  render() {
    return (
      <div>
        <h2 className="register"> Enregistrement </h2>
        <div>
          <Form className="formRegister" onSubmit={this.postRegister}>
            <Form.Group>
              <Form.Input className="blockRegister" label="Identifiant: " placeholder="Identifiant" name="Identifiant" onChange={event => this.handleChange(event, 'Identifiant')} />
              <Form.Input className="blockRegister" label="Mail: " placeholder="E-mail" name="Email" onChange={event => this.handleChange(event, 'Email')} />
            </Form.Group>
            <Form.Group>
              <Form.Input className="blockRegister" type="password" label="Mot de Pass: " placeholder="Mot de pass" name="Password" onChange={event => this.handleChange(event, 'Password')} />
              <Form.Input className="blockRegister" type="password" label="Confirmation: " placeholder="Confirmation" name="Confirm" onChange={event => this.handleChange(event, 'Confirm')} />
            </Form.Group>
            <Button type="submit" color="teal" animated>
              <Button.Content visible>Soumettre</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
