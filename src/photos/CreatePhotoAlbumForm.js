import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { fetchApi, jsonOnStatus, handleJsonByStatus } from '../utils/api';
import FeedbackMessage from '../common/FeedbackMessage';
import TextFormField from '../forms/TextFormField';
import FormButton from '../forms/FormButton';
import { Check } from 'react-feather';

class CreatePhotoAlbumForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      albumId: null,
      emailAlreadyExists: false,
      error: false
    };

    this.titleInput = React.createRef();

    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  createNewUserAndAlbum() {
    fetchApi('POST', 'auth/user', { email: this.state.email })
      .then((response) => handleJsonByStatus(response, {
        201: (json) => this.handleNewUser(json),
        409: () => this.setState({ emailAlreadyExists: true })
      }))
      .catch(() => this.setState({ error: true }));
  }

  createNewAlbum() {
    fetchApi('POST', 'drafts/photo-albums', { title: this.titleInput.current.value })
      .then((response) => jsonOnStatus(response, 201))
      .then((json) => this.handleNewAlbum(json))
      .catch(() => this.setState({ error: true }));
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      emailAlreadyExists: false,
      error: false
    });

    // if guest, then see if a new account can be created for that email
    if (!this.props.user) {
      this.createNewUserAndAlbum();
    } else {
      this.createNewAlbum();
    }
  }

  handleNewUser(data) {
    this.props.onAuthTokenRetrieved(data);
    this.createNewAlbum();
  }

  handleNewAlbum(data) {
    this.setState({ albumId: data.data.id });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  render() {
    if (this.state.albumId) {
      return <Redirect to={`/album/${this.state.albumId}`} />
    }

    return (
      <form onSubmit={ (event) => this.handleSubmit(event) }>
        { this.state.error && 
          <FeedbackMessage type="error" className="mb-8">
            Uh oh! Something didn't go right. "If at first you don't succeed...
          </FeedbackMessage>
        }
        { this.state.emailAlreadyExists &&
          <FeedbackMessage type="error" className="mb-8">
            Your email address already has an account. <Link to="/login" className="text-white">Please log in</Link> before creating an album.
          </FeedbackMessage>
        }
        <TextFormField inputRef={this.titleInput} name="title" label="Album title" autoComplete="off" />
        <TextFormField name="email" label="Your email" autoComplete="email" value={this.props.user ? this.props.user.email : this.state.email} onChange={this.handleEmailChange} disabled={this.props.user} />  
        { this.props.user && 
          <p className="ml-1/4 -mt-2 mb-4 text-grey text-14">
            Is this not you? <Link to="/login" className="text-grey hover:text-white">Login with a different email</Link>
          </p>
        }      
        <FormButton label="create draft photo album" type="submit" iconComponent={Check} color="conifer" />      
      </form>
    );    
  }
}

export default CreatePhotoAlbumForm;