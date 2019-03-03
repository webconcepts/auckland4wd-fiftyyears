import React from 'react';

function Button({ 
  iconComponent, 
  type = 'button', 
  label,
  onClick,
  disabled, 
  className,
  textColor = 'white', 
  hoverColor = 'white', 
  iconColor, 
  disabledColor = 'grey-dark'
}) {
  const IconComponent = iconComponent;

  const textCss = disabled ? `text-${disabledColor}` : `text-${textColor}`;
  const hoverCss = disabled ? '' : `hover:text-${hoverColor} focus:text-${hoverColor}`;
  const iconCss = iconColor && !disabled ? `text-${iconColor}` : '';

  return (
    <button 
      type={type} 
      disabled={disabled}
      onClick={onClick} 
      className={`flex md:inline-flex items-center focus:outline-none ${textCss} ${hoverCss} ${disabled && 'cursor-default'} ${className}`} 
    >
      <div className={`py-2 pr-2 leading-none ${iconCss}`}>
        <IconComponent size="24" />
      </div> 
      <div className="font-semibold">
        {label}
      </div>
    </button>
  );
}

export default Button;
