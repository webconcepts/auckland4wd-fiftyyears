import React from 'react';

import TimelineItemMeta from './TimelineItemMeta';

function TimelineMilestone({ item }) {
  return (
    <div className="sm:px-3 py-6">
      <h4 className="font-semibold text-18">{item.title}</h4>
      <div className="typography font-light my-3" dangerouslySetInnerHTML={{__html: item.description}} />
      <TimelineItemMeta item={item} />
    </div>
  );
}

export default TimelineMilestone;
