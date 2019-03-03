import React from 'react';

function TipsHeader(props) {
  return (
    <h3 className="text-16 text-buttercup font-semibold mb-2">
      {props.children}
    </h3>
  );
}

export default TipsHeader;
