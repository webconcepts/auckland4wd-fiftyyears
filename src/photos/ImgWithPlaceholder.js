import React from 'react';

import PreloadImage from './PreloadImage';

function ImgWithPlaceholder(props) {
  const { src, placeholder, ...otherProps } = props;

  return (
    <PreloadImage src={src} fallback={() => <img src={placeholder} {...otherProps} />}>
      <img src={src} {...otherProps} />
    </PreloadImage>
  );
}

export default ImgWithPlaceholder;
