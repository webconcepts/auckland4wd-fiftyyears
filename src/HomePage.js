import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from './common/PageHeader';
import ToggleViewButton from './common/ToggleViewButton';
import CreatePhotoAlbumForm from './photos/CreatePhotoAlbumForm';
import DraftPhotoAlbumList from './photos/DraftPhotoAlbumList';
import { Image } from 'react-feather';

function HomePage(props) {
  return (
    <React.Fragment>
      <PageHeader user={props.user} />
      <div className="max-w-md mx-auto">
        <h2 className="font-light text-24 mt-12 mb-10">This year we celebrate 50 years</h2>
        <div className="typography leading-normal font-light mb-8">
          <p>
            We look back on the many events we've had, the many places we've been and the many
            great times that we have shared together. 
          </p>
          <p>
            We hope that you will share your photos and videos, and help us 
            collate a record of the clubs history that will be published here for 
            everyone to enjoy during our reunion in April. 
          </p>
        </div>
        <ToggleViewButton label="Create a photo album" iconComponent={Image} iconColor="buttercup" hoverColor="buttercup" hideByDefault={true} onlyOnce={true}>
          <CreatePhotoAlbumForm user={props.user} onAuthTokenRetrieved={props.onAuthTokenRetrieved} />
        </ToggleViewButton>
        {props.user && <DraftPhotoAlbumList user={props.user} />}
      </div>
    </React.Fragment>
  );
}

export default HomePage;
