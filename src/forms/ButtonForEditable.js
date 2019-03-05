import React from 'react';

import { Check, Edit2 } from 'react-feather';

function ButtonForEditable({
  fieldName,
  onClick,
  editing = false,
  hasValue = false,
  multiline = false,
  color = 'havelock',
  className
}) {
  const paddingLeft = multiline ? '' : 'pl-2 ';
  const css = `hover:text-${color} focus:text-${color} focus:outline-none`;

  if (editing) {
    return (
      <button onClick={onClick} title="Done" className={`text-white ${css} ${paddingLeft}`}>
        { /* @todo replace svg to avoid using transfrom to align icon to baseline of text */ }
        <Check size="23" transform="translate(0,5)" className="leading-0" /> { multiline && 'save' }
      </button>);
  } else if (hasValue) {
    return (
      <button onClick={onClick} title="Edit" className={`text-grey ${css} ${paddingLeft}`}>
        <Edit2 size="17" transform="translate(0,2)" /> { multiline && 'edit' }
      </button>);
  } else {
    return (
      <button onClick={onClick} className={`${className} text-grey ${css}`}>
        add {fieldName}
      </button>);
  }
}

export default ButtonForEditable;
