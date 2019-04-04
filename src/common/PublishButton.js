import React from 'react';

function PublishButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="relative uppercase text-grey-light mt-3 text-12 bg-blackish-light py-2 px-4 md:mt-0 md:text-14 hover:bg-monza hover:text-white"
      style={{ top: '-5px' }}
    >
      {label}
    </button>
  );
}

export default PublishButton;
