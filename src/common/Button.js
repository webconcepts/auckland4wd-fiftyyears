import React from 'react';

function Button(props) {
  const IconComponent = props.iconComponent;

  const textColor = props.textColor ? props.textColor : 'white';
  const textClass = props.disabled ? props.color : textColor;
  const extraClasses = props.className ? props.className : '';

  return (
    <button 
      type={props.type ? props.type : 'button'} 
      disabled={props.disabled}
      onClick={props.onClick} 
      className={`text-${textClass} flex md:inline-flex items-center focus:outline-none hover:text-${props.color} focus:text-${props.color} ${extraClasses}`} 
    >
      <div className={`py-2 pr-2 leading-none text-${props.color}`}>
        <IconComponent size="24" />
      </div> 
      <div className="font-semibold">
        {props.label}
      </div>
    </button>
  );
}

export default Button;
