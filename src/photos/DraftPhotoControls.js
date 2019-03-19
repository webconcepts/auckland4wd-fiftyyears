import React from 'react';

import ItemContext from '../context/item-context';
import ItemPhotosContext from '../context/item-photos-context';
import PhotoControls from './PhotoControls';
import { Flag, Trash } from 'react-feather';

function DraftPhotoControls(props) {
  return (
    <PhotoControls {...props}>
      <React.Fragment>
        <ItemContext.Consumer>
          {(context) => (
            <button
              title="Set as album cover photo"
              onClick={() => context.setCoverPhoto(props.id)}
              className={`block float-left px-4 py-6 ${context.data.cover_photo_id == props.id ? 'text-buttercup cursor-default' : 'text-white hover:text-havelock focus:text-havelock'}`}
              disabled={context.data.cover_photo_id == props.id}
            >
              <Flag size="18" />
            </button>
          )}
        </ItemContext.Consumer>
        <ItemPhotosContext.Consumer>
          {(context) => (
            <button
              title="Delete this photo"
              onClick={() => {
                if (window.confirm('Are you sure you would like to delete this photo?')) {
                  context.remove(props.photoKey);
                }
              }}
              className="block float-left px-4 py-6 text-white hover:text-monza focus:text-monza"
            >
              <Trash size="18" />
            </button>
          )}
        </ItemPhotosContext.Consumer>
      </React.Fragment>
    </PhotoControls>
  );
}

export default DraftPhotoControls;
