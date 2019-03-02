import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  const linkClasses = 'text-havelock hover:no-underline focus:no-underline';

  return (
    <div className="absolute flex justify-center items-center h-full w-full">
      <div className="text-center p-8 pb-12">
        <h1 className="font-normal text-grey uppercase mb-16 tracking-wide">Page not found</h1>
        <h2 className="text-34 font-light text-buttercup mb-12">Are you on the wrong track?</h2>
        <p className="text-18 mb-4">
          It looks you have got a bit lost? This track is a dead end.
        </p>
        <p className="text-18">
          It's time to <a href="javascript:window.history.back()" className={linkClasses}>backtrack</a> or go <Link to="/" className={linkClasses}>right back to the road</Link>
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;