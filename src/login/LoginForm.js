import React from 'react';
import { fetchApi, onStatus } from '../utils/api.js';

import FeedbackMessage from '../common/FeedbackMessage';
import TextFormField from '../forms/TextFormField';
import FormButton from '../forms/FormButton';
import { LogIn } from 'react-feather';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      sent: false,
      error: false
    };

    this.emailInput = React.createRef();
  } 

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ 
      loading: true,
      sent: false, 
      error: false,
    });

    fetchApi('POST', 'auth/verification', { email: this.emailInput.current.value })
      .then((response) => onStatus(response, 201))
      .then(() => this.setState({ loading: false, sent: true }))
      .catch(() => this.setState({ loading: false, error: true }));
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        { this.state.error && (
          <FeedbackMessage type="error" className="mb-8">
            Uh oh! Something went wrong. Please check your email address is correct, and try again.
          </FeedbackMessage>
        )}
        { this.state.sent && (
          <FeedbackMessage className="mb-8">
            An email has been sent. Use the link in that email to complete your login.
          </FeedbackMessage>
        )}
        <TextFormField inputRef={this.emailInput} name="email" label="Your email" autocomplete="email" disabled={this.state.loading} />  
        <FormButton label="Login by email" type="submit" iconComponent={LogIn} iconColor="havelock" hoverColor="havelock" disabled={this.state.loading} />  
      </form>       
    );
  }
}

export default LoginForm;