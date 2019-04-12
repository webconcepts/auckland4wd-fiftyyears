import React from 'react';

function FeedbackMessage(props) {
  const bgColor = props.type == 'error' ? 'bg-buttercup-dark' : 'bg-havelock-dark';

  return (
    <p className={`${bgColor} text-white font-light leading-normal py-3 px-4 ${props.className}`}>
      {props.children}
    </p>
  );
}

export default FeedbackMessage;
