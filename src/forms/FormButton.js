import React from 'react';
import Button from '../common/Button';

function FormButton(props) {
  return (
    <div className="sm:ml-1/4">
      <Button { ...props } />
    </div>
  );
}

export default FormButton;
