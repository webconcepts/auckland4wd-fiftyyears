import React from 'react';
import { monthName } from '../utils/date';

function TimelineItemMeta({ item }) {
  if (!item.approx_month && !item.location) {
    return null;
  }

  return (
    <p className="mb-2 font-light text-buttercup">
      {item.approx_month && monthName(item.approx_month)}
      {item.approx_month && item.location && (
        <span className="text-grey px-1 sm:px-2">&ndash;</span>
      )}
      {item.location}
    </p>
  );
}

export default TimelineItemMeta;
