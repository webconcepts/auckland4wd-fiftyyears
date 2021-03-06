import React from 'react';
import { Route } from 'react-router-dom';

import ItemState from '../context/ItemState';
import ItemPhotosState from '../context/ItemPhotosState';
import ContentPage from '../ContentPage';
import PhotoGrid from './PhotoGrid';
import PhotoView from './PhotoView';
import { Camera } from 'react-feather';

function PhotoAlbum(props) {
  const albumUrl = props.match.url;

  return (
    <ItemState apiPath="photo-albums" id={props.match.params.id}>
      <ItemPhotosState id={props.match.params.id}>
        <Route path={`${props.match.path}/photo/:photoId`} render={props => (
          <PhotoView
            key={props.match.params.photoId}
            id={props.match.params.photoId}
            album={props.match.params.id}
            albumUrl={albumUrl}
          />
        )} />
        <ContentPage authorshipIcon={Camera} authorshipLabel="Photographer">
          <PhotoGrid match={props.match} albumId={props.match.params.id} />
        </ContentPage>
      </ItemPhotosState>
    </ItemState>
  );
}

export default PhotoAlbum;
