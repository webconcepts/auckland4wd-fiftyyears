import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { fetchApi, jsonOnStatus, handleJsonByStatus } from './utils/api';

import UserContext from './context/user-context';
import FeedbackMessage from './common/FeedbackMessage';
import TextFormField from './forms/TextFormField';
import FormButton from './forms/FormButton';
import { Check } from 'react-feather';

class CreateItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      id: null,
      emailAlreadyExists: false,
      isError: false
    };

    this.titleInput = React.createRef();

    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  createNewUserAndItem() {
    fetchApi('POST', 'auth/user', { email: this.state.email })
      .then((response) => handleJsonByStatus(response, {
        201: () => this.createNewItem(),
        409: () => this.setState({ emailAlreadyExists: true })
      }))
      .catch(() => this.setState({ isError: true }));
  }

  createNewItem() {
    fetchApi('POST', 'drafts/' + this.props.apiPath, { title: this.titleInput.current.value })
      .then((response) => jsonOnStatus(response, 201))
      .then((json) => this.setState({ id: json.data.id }))
      .catch(() => this.setState({ isError: true }));
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      emailAlreadyExists: false,
      isError: false
    });

    // if guest, then see if a new account can be created for that email
    if (!this.context.id) {
      this.createNewUserAndItem();
    } else {
      this.createNewItem();
    }
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  render() {
    if (this.state.id) {
      return <Redirect to={`/${this.props.urlPath}/${this.state.id}`} />
    }

    return (
      <form onSubmit={ (event) => this.handleSubmit(event) }>
        { this.state.isError &&
          <FeedbackMessage type="error" className="mb-8">
            Uh oh! Something didn't go right. "If at first you don't succeed...
          </FeedbackMessage>
        }
        { this.state.emailAlreadyExists &&
          <FeedbackMessage type="error" className="mb-8">
            Your email address already has an account. <Link to="/login" className="text-white">Please log in</Link> before
            creating a {this.props.label.toLowerCase()}.
          </FeedbackMessage>
        }
        <TextFormField inputRef={this.titleInput} name="title" label={`${this.props.label} title`} autoComplete="off" />
        <TextFormField
          name="email"
          label="Your email"
          autoComplete="email"
          value={this.context.id ? this.context.email : this.state.email}
          onChange={this.handleEmailChange}
          disabled={this.context.id}
        />
        { this.context.id &&
          <p className="ml-1/4 -mt-2 mb-4 text-grey text-14">
            Is this not you? <Link to="/login" className="text-grey hover:text-white">Login with a different email</Link>
          </p>
        }
        <FormButton
          label={`create draft ${this.props.label.toLowerCase()}`}
          type="submit"
          iconComponent={Check}
          iconColor="conifer"
          hoverColor="conifer"
        />
      </form>
    );
  }
}

CreateItemForm.contextType = UserContext;

export default CreateItemForm;
