import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';

function ContentPageFooter(props) {
  return (
    <footer className="sm:flex flex-row px-6 md:px-10 py-6">
      <Link 
        to={props.linkBackTo} 
        title="Back" 
        className="text-white no-underline p-4 -ml-4 hover:text-havelock focus:text-havelock"
      >
        <ArrowLeft size="30" />
      </Link>
      <p className="flex-grow text-12 sm:text-14 text-grey text-right py-2 leading-normal">
        All content is property of its respective owners.<br />
        Please do not copy or repost without permission.
      </p>
    </footer>
  );
}

export default ContentPageFooter;