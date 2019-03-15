import React from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../common/Spinner';

function PhotoGridItem({ src, linkTo, uploading, onLoad }) {
  return (
    <div className="relative w-full h-0 pb-full">
      <Link
        to={linkTo}
        className={`absolute flex w-full h-full overflow-hidden ${uploading ? 'pointer-events-none' : ''}`}
      >
        <img
          src={src}
          onLoad={onLoad}
          className={`object-cover w-full hover:shadow-inner ${uploading ? 'opacity-40' : ''}`}
        />
        {uploading && <Spinner className="absolute pin" size="45" />}
      </Link>
    </div>
  );
}

export default PhotoGridItem;
