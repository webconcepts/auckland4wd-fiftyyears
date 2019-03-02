import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchApi, jsonOnStatus } from './utils/api';

import UserState from './context/UserState';
import HomePage from './HomePage';
import LoginPage from './login/LoginPage';
import VerifyPage from './login/VerifyPage';
import PageNotFound from './PageNotFound';
import PhotoAlbum from './photos/PhotoAlbum';
import PhotoView from './photos/PhotoView';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.handleAuthTokenRetrieved = this.handleAuthTokenRetrieved.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
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
    this.setState({ user: null });
  }

  handleAuthTokenRetrieved(data) {
    console.log(data);

    localStorage.setItem('access_token', data.access_token);

    this.setState({
      user: data.user
    });
  }

  render() {
    return (
      <UserState>
        <Router>
          <Switch>
            <Route path="/" exact render={(props) => 
              <HomePage {...props} user={this.state.user} onAuthTokenRetrieved={this.handleAuthTokenRetrieved} />
            } />
            <Route path="/album/:id" component={PhotoAlbum} />
            <Route path="/photo/:id" component={PhotoView} />
            <Route path="/login" component={LoginPage} />
            <Route path="/verify/:code" render={(props) => 
              <VerifyPage {...props} onAuthTokenRetrieved={this.handleAuthTokenRetrieved} />
            } />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </UserState>
    );
  }
}

export default App;
