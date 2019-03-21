import React from 'react';
import { Link } from 'react-router-dom';

import ImgWithPlaceholder from './ImgWithPlaceholder';
import Spinner from '../common/Spinner';

function PhotoGridItem({ src, linkTo, uploading, placeholder }) {
  const ImgComponent = placeholder ? ImgWithPlaceholder : 'img';

  return (
    <div className="relative w-full h-0 pb-full">
      <Link
        to={linkTo}
        className={`absolute flex w-full h-full overflow-hidden ${uploading ? 'pointer-events-none' : ''}`}
      >
        <ImgComponent
          src={src}
          placeholder={placeholder}
          className={`object-cover w-full hover:shadow-inner ${uploading ? 'opacity-40' : ''}`}
        />
        {uploading && <Spinner className="absolute pin" size="45" />}
      </Link>
    </div>
  );
}

export default PhotoGridItem;
