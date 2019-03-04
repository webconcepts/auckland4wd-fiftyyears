import React from 'react';

import UserContext from './user-context';

class UserState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      email: null,
      editor: false
    };

    this.handleTokenChange = this.handleTokenChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('access_token_updated', this.handleTokenChange);
    this.handleTokenChange();
  }

  componentWillUnmount() {
    window.removeEventListener('access_token_updated', this.handleTokenChange);
  }

  handleTokenChange() {
    const token = window.localStorage.getItem('fiftyyears:access_token');

    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const claims = JSON.parse(window.atob(base64));

      this.setState({
        id: claims.sub,
        email: claims.email,
        editor: claims.editor
      });
    } else {
      this.setState({ 
        id: null,
        email: null,
        editor: false
      });
    }
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          id: this.state.id,
          email: this.state.email,
          editor: this.state.editor
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserState;