import React from 'react';

import EditableDate from '../forms/EditableDate';

function DraftMetaListDateItem({
  label,
  day,
  month,
  year,
  onChangeDay,
  onChangeMonth,
  onChangeYear,
  onEditingDone,
  iconComponent,
  color
}) {
  const IconComponent = iconComponent;

  return (
    <li className="flex md:inline-flex items-center pr-10" aria-label={label}>
      <div className={`py-1 pr-4 leading-none text-${color}`}>
        <IconComponent size="22" />
      </div>
      <EditableDate
        name={label}
        day={day}
        month={month}
        year={year}
        onChangeDay={onChangeDay}
        onChangeMonth={onChangeMonth}
        onChangeYear={onChangeYear}
        onEditingDone={onEditingDone}
        color={color}
        className="inline-block py-1 text-15 md:text-16"
      />
    </li>
  );
}

export default DraftMetaListDateItem;
