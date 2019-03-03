import React, { Fragment } from 'react';

function TipsInlineHeader(props) {
  return (
    <Fragment>
      <strong className="text-16 text-buttercup font-semibold mb-2 inline-block">
        {props.children}
      </strong> 
      <span className="pl-2 pr-2 text-grey">&ndash;</span>
    </Fragment>
  );
}

export default TipsInlineHeader;
