import React from 'react';

import Spinner from '../common/Spinner';

function Button({
  component,
  iconComponent,
  label,
  disabled = false,
  loading = false,
  className,
  textColor = 'white',
  hoverColor = 'white',
  iconColor,
  disabledColor = 'grey-dark',
  ...componentProps
}) {
  const ButtonComponent = component ? component : 'button';
  const IconComponent = iconComponent;

  const isDisabled = disabled || loading;

  const textCss = isDisabled ? `text-${disabledColor}` : `text-${textColor}`;
  const hoverCss = isDisabled ? '' : `hover:text-${hoverColor} focus:text-${hoverColor}`;
  const iconCss = iconColor && !isDisabled ? `text-${iconColor}` : '';

  return (
    <ButtonComponent
      disabled={isDisabled}
      className={`flex md:inline-flex items-center focus:outline-none ${textCss} ${hoverCss} ${isDisabled && 'cursor-default'} ${className}`}
      {...componentProps}
    >
      <div className={`py-2 pr-2 leading-none ${iconCss}`}>
        <IconComponent size="24" />
      </div>
      <div className="font-semibold">
        {label}
      </div>
      {loading && <Spinner className="ml-3" />}
    </ButtonComponent>
  );
}

export default Button;
