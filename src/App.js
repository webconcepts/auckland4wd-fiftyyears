import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserState from './context/UserState';
import TimelineState from './context/TimelineState';
import HomePage from './HomePage';
import ContributePage from './ContributePage';
import LoginPage from './login/LoginPage';
import VerifyPage from './login/VerifyPage';
import PageNotFound from './PageNotFound';
import PhotoAlbum from './photos/PhotoAlbum';
import DraftPhotoAlbum from './photos/DraftPhotoAlbum';
import VideoPage from './videos/VideoPage';
import DraftVideoPage from './videos/DraftVideoPage';
import DraftMilestonePage from './milestones/DraftMilestonePage';
import FeedbackMessage from './common/FeedbackMessage';
import { FetchApiMissing } from './utils/api';

class App extends React.Component {
  render() {
    return (
      <UserState>
        <TimelineState>
          <FetchApiMissing>
            <FeedbackMessage type="error">
              Uh oh! It looks like your browser is out of date and incompatible with this website.
              Upgrade to a modern browser like <a href="https://www.google.com/chrome" className="text-white">Chrome</a> or <a href="https://www.firefox.com/" className="text-white">Firefox</a>.
            </FeedbackMessage>
          </FetchApiMissing>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/photo-album/:id" component={PhotoAlbum} />
              <Route path="/video/:id" component={VideoPage} />
              <Route path="/contribute" component={ContributePage} />
              <Route path="/draft/photo-album/:id" component={DraftPhotoAlbum} />
              <Route path="/draft/video/:id" component={DraftVideoPage} />
              <Route path="/draft/milestone/:id" component={DraftMilestonePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/verify/:code" component={VerifyPage} />
              <Route component={PageNotFound} />
            </Switch>
          </BrowserRouter>
        </TimelineState>
      </UserState>
    );
  }
}

export default App;
