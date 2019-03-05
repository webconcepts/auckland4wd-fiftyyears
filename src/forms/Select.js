import React from 'react';

function Select({ value, options, useOptionIndexAsValue, onChange, handleKeyPress }, ref) {
  return (
    <select 
      ref={ref} 
      value={value ? value : ''}
      onChange={onChange} 
      className="text-dust bg-tint-white h-8 inline-block"
      onKeyPress={handleKeyPress}
    >
      <option value=""></option>
      {options.map((option, i) => option && (
        <option key={i} value={useOptionIndexAsValue ? i : option}>{option}</option>
      ))}
    </select>
  );
}

export default React.forwardRef(Select);
