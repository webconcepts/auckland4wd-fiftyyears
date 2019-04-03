import React from 'react';
import { Route } from 'react-router-dom';

import ItemState from '../context/ItemState';
import ItemPhotosState from '../context/ItemPhotosState';
import DraftContentPage from '../DraftContentPage';
import PhotoAlbumTips from './PhotoAlbumTips';
import PhotoGrid from './PhotoGrid';
import PhotoView from './PhotoView';
import { Camera } from 'react-feather';

function DraftPhotoAlbum(props) {
  const albumUrl = props.match.url;

  return (
    <ItemState apiPath="photo-albums" id={props.match.params.id} draft={true}>
      <ItemPhotosState id={props.match.params.id} draft={true}>
        <Route path={`${props.match.path}/photo/:photoId`} render={props => (
          <PhotoView
            key={props.match.params.photoId}
            id={props.match.params.photoId}
            album={props.match.params.id}
            albumUrl={albumUrl}
            editable={true}
          />
        )} />
        <DraftContentPage
          TipsComponent={PhotoAlbumTips}
          authorshipLabel="Photographer"
          authorshipIcon={Camera}
        >
          <PhotoGrid match={props.match} albumId={props.match.params.id} editable={true} />
        </DraftContentPage>
      </ItemPhotosState>
    </ItemState>
  );
}

export default DraftPhotoAlbum;
