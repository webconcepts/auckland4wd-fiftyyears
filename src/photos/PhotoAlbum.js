import React from 'react';
import { Route } from 'react-router-dom';

import ItemState from '../context/ItemState';
import ItemPhotosState from '../context/ItemPhotosState';
import DraftContentPage from '../DraftContentPage';
import PhotoAlbumTips from './PhotoAlbumTips';
import PhotoGrid from './PhotoGrid';
import PhotoView from './PhotoView';
import { Camera } from 'react-feather';

function PhotoAlbum(props) {
  return (
    <ItemState apiPath="photo-albums" id={props.match.params.id}>
      <ItemPhotosState id={props.match.params.id}>
        <div className="font-sans">
          <Route path={`${props.match.path}/photo/:photoId`} render={props => (
            <PhotoView key={props.match.params.photoId} id={props.match.params.photoId} album={props.match.params.id} />
          )} />
          <DraftContentPage
            tipsComponent={PhotoAlbumTips}
            authorshipLabel="Videographer"
            authorshipName="videographer"
            authorshipIcon={Camera}
          >
            <PhotoGrid history={props.history} match={props.match} albumId={props.match.params.id} />
          </DraftContentPage>
        </div>
      </ItemPhotosState>
    </ItemState>
  );
}

export default PhotoAlbum;
