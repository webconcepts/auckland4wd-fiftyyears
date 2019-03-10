import React from 'react';
import Spinner from './Spinner';

function PageSpinner() {
  return (
    <div className="fixed pin z-1 flex items-center justify-center bg-blackish">
      <Spinner size="60" delay="1.2" />
    </div>
  );
}

export default PageSpinner;
