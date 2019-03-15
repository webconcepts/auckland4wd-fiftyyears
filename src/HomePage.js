import React from 'react';
import { Link } from 'react-router-dom';

import UserContext from './context/user-context';
import PageHeader from './common/PageHeader';
import ToggleViewButton from './common/ToggleViewButton';
import CreateItemForm from './CreateItemForm';
import DraftsList from './DraftsList';
import { Image, Video } from 'react-feather';

function HomePage(props) {
  return (
    <React.Fragment>
      <PageHeader />
      <div className="max-w-md mx-auto pb-24">
        <div className="typography leading-normal font-light mt-10 mb-8">
          <p className="text-24 pb-4">
            This year we celebrate 50 years, of trips, events, competitions and many
            great times shared together.
          </p>
          <p>
            We hope that you will share your photos and videos, and help us
            collate a record of the clubs history that will be published here for
            everyone to enjoy during our reunion in April.
          </p>
        </div>
        <UserContext.Consumer>
          {context => (
            <React.Fragment>
              <ToggleViewButton
                label="Create a photo album"
                iconComponent={Image}
                iconColor="buttercup"
                hoverColor="buttercup"
                hideByDefault={true}
                onlyOnce={true}
              >
                <CreateItemForm apiPath="photo-albums" urlPath="album" label="Photo album" />
              </ToggleViewButton>
              <ToggleViewButton
                label="Create a video"
                iconComponent={Video}
                iconColor="monza"
                hoverColor="monza"
                hideByDefault={true}
                onlyOnce={true}
              >
                <CreateItemForm apiPath="videos" urlPath="video" label="Video" />
              </ToggleViewButton>
              {context.id && (
                <div className="mt-16">
                  <DraftsList />
                </div>
              )}
            </React.Fragment>
          )}
        </UserContext.Consumer>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
