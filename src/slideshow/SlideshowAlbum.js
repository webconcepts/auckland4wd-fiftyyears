import React from 'react';

import SlideshowPhoto from './SlideshowPhoto';
import FullsizeImageDimensions from '../photos/FullsizeImageDimensions';

function SlideshowAlbum({ data, photos, currentIndex, hidden }) {
  if (photos[currentIndex] === undefined) {
    return null;
  }

  const nextPhoto = photos[currentIndex + 1] !== undefined ? photos[currentIndex + 1] : false;

  return (
    <div hidden={hidden}>
      <FullsizeImageDimensions>
        {({ imgWidth, imgHeight }) => (
          <React.Fragment>
            <SlideshowPhoto
              key={photos[currentIndex].id}
              albumId={data.id}
              photo={photos[currentIndex]}
              width={imgWidth}
              height={imgHeight}
            />
            {nextPhoto && (
              <SlideshowPhoto
                key={nextPhoto.id}
                albumId={data.id}
                photo={nextPhoto}
                width={imgWidth}
                height={imgHeight}
                hidden={true}
              />
            )}
          </React.Fragment>
        )}
      </FullsizeImageDimensions>
      <div className="absolute pin-t pin-l pin-r p-8 bg-gradient-black-to-bottom">
        <h3 className="ss-title inline-block text-34 font-normal mr-6">{data.title}</h3>
        {(data.approx_year || data.location) && (
          <p className="ss-meta inline-block text-24 font-normal text-white">
            {data.approx_year}
            {data.approx_year && data.location && (
              <span className="px-1 sm:px-2">&ndash;</span>
            )}
            {data.location}
          </p>
        )}
        {data.authorship && (
          <p className="ss-authorship mt-2 font-light text-white text-18 ">
            {data.authorship}
          </p>
        )}
      </div>
    </div>
  );
}

export default SlideshowAlbum;
