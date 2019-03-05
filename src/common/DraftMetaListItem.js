import React from 'react';

import Editable from '../forms/Editable';

function DraftMetaListItem({ name, value, onChange, onEditingDone, color, label, iconComponent }) {
  const IconComponent = iconComponent;

  return (
    <li className="flex md:inline-flex items-center pr-10" aria-label={label}>
      <div className={`py-2 pr-4 leading-none text-${color}`}>
        <IconComponent size="22" />
      </div>                
      <Editable 
        name={name} 
        value={value} 
        onChange={onChange} 
        onEditingDone={onEditingDone} 
        color={color} 
        className="inline-block py-2" 
      />           
    </li>
  );
}

export default DraftMetaListItem;
