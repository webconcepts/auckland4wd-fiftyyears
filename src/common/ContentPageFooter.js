import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';

function ContentPageFooter(props) {
  return (
    <footer className="sm:flex sm:flex-row-reverse px-6 md:px-10 py-6">
      <p className="flex-grow text-12 text-center text-grey py-2 leading-normal sm:text-14 sm:text-right">
        All content is property of its respective owners.<br />
        Please do not copy or repost without permission.
      </p>
      <Link
        to={props.linkBackTo}
        title="Back"
        className="inline-block p-4 -ml-4 text-white no-underline hover:text-havelock focus:text-havelock"
      >
        <ArrowLeft size="30" />
      </Link>
    </footer>
  );
}

export default ContentPageFooter;
