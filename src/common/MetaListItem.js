import React from 'react';

function MetaListItem({ label, color, children, iconComponent }) {
  const IconComponent = iconComponent ? iconComponent : null;

  return (
    <li className="flex items-center md:inline-flex md:pr-10" aria-label={label}>
      {iconComponent && (
        <div className={`py-1 pr-4 leading-none text-${color}`}>
          <IconComponent size="22" />
        </div>
      )}
      <div className="inline-block py-1 text-15 md:text-16">
        {children}
      </div>
    </li>
  );
}

export default MetaListItem;
