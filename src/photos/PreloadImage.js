import React from 'react';

function PreloadImage(props) {
  (new Image()).src = props.src;
  return null;
}

export default PreloadImage;
