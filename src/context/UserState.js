import React from 'react';
import { fetchApi, jsonOnStatus, handleJsonByStatus } from '../utils/api';

import UserContext from './user-context';

class UserState extends React.Component {
  state = {
    id: null,
    email: null,
    access_expires: null,
    verification_expired: false
  }

  componentDidMount() {
    // this.fetchUser();
  }

  verify(verificationCode) {
    fetchApi('POST', 'auth/token', { verification_code: verificationCode })
      .then((response) => handleJsonByStatus(response, {
        201: (json) => this.handleAuthTokenRetrieved(json),
        410: () => this.setState({ verification_expired: true })
      }))
      .catch(() => this.setState({ apiError: true }));
  }

  fetchUser() {    
    if (localStorage.getItem('access_token')) {
      fetchApi('PATCH', 'auth/token')
        .then((response) => jsonOnStatus(response, 201))
        .then((json) => this.handleAuthTokenRetrieved(json))
        .catch(() => this.clearUser());
    } else {
      this.clearUser();
    }
  }

  clearUser() {
    localStorage.removeItem('access_token');
    this.setState({ 
      id: null,
      email: null,
      access_expires: null
    });
  }

  handleAuthTokenRetrieved(data) {
    console.log(data);

    localStorage.setItem('access_token', data.access_token);

    this.setState({
      id: data.user.id,
      email: data.user.email,
      access_expires: data.expires_in
    });
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          id: this.state.id,
          email: this.state.email,
          access_expires: this.state.access_expires
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserState;