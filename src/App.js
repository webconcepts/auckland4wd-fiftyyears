import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserState from './context/UserState';
import HomePage from './HomePage';
import LoginPage from './login/LoginPage';
import VerifyPage from './login/VerifyPage';
import PageNotFound from './PageNotFound';
import PhotoAlbum from './photos/PhotoAlbum';
import VideoPage from './videos/VideoPage';
import MilestonePage from './milestones/MilestonePage';

class App extends React.Component {
  render() {
    return (
      <UserState>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/album/:id" component={PhotoAlbum} />
            <Route path="/video/:id" component={VideoPage} />
            <Route path="/milestone/:id" component={MilestonePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/verify/:code" component={VerifyPage} />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </UserState>
    );
  }
}

export default App;
