import React from 'react';

import Editable from '../forms/Editable';

function DraftMetaListItem({ label, value, onChange, onEditingDone, color, iconComponent }) {
  const IconComponent = iconComponent;

  return (
    <li className="flex items-center md:inline-flex md:pr-10" aria-label={label}>
      <div className={`py-1 pr-4 leading-none text-${color}`}>
        <IconComponent size="22" />
      </div>
      <Editable
        name={label}
        value={value}
        onChange={onChange}
        onEditingDone={onEditingDone}
        color={color}
        className="inline-block py-1 text-15 md:text-16"
      />
    </li>
  );
}

export default DraftMetaListItem;
