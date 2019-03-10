import React from 'react';

import EditableDate from '../forms/EditableDate';

function DraftMetaListDateItem({ 
  name,
  day,
  month,
  year,
  onChangeDay,
  onChangeMonth,
  onChangeYear,
  onEditingDone,
  iconComponent,
  label,
  color
}) {
  const IconComponent = iconComponent;

  return (
    <li className="flex md:inline-flex items-center pr-10" aria-label={label}>
      <div className={`py-2 pr-4 leading-none text-${color}`}>
        <IconComponent size="22" />
      </div>                
      <EditableDate 
        name={name} 
        day={day} 
        month={month} 
        year={year} 
        onChangeDay={onChangeDay} 
        onChangeMonth={onChangeMonth} 
        onChangeYear={onChangeYear} 
        onEditingDone={onEditingDone} 
        color={color} 
        className="inline-block py-2" 
      />           
    </li>
  );
}

export default DraftMetaListDateItem;