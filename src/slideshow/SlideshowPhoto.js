import React from 'react';
import { imageSrc } from '../utils/images';

import FullscreenImage from '../photos/FullscreenImage';
import PreloadImage from '../photos/PreloadImage';

function SlideshowPhoto({ albumId, photo, width, height, hidden = false }) {
  const src = imageSrc(albumId, photo.id, width, height, 'inside');

  if (hidden) {
    return <PreloadImage src={src} />;
  }

  return (
    <React.Fragment>
      <FullscreenImage src={src} />
      {photo.description && (
        <p className="ss-caption absolute pin-b pin-l pin-r p-10 bg-gradient-black-to-top text-white text-center text-24 font-light">
          {photo.description}
        </p>
      )}
    </React.Fragment>
  );
}

export default SlideshowPhoto;
