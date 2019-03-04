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
  render() {
    return (
      <UserState>
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/album/:id" component={PhotoAlbum} />
            <Route path="/photo/:id" component={PhotoView} />
            <Route path="/login" component={LoginPage} />
            <Route path="/verify/:code" component={VerifyPage} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </UserState>
    );
  }
}

export default App;
