import React from 'react';

import TimelineItemMeta from './TimelineItemMeta';
import { Flag } from 'react-feather';

function TimelineMilestone({ item }) {
  return (
    <div className="sm:px-3 py-6">
      <div className="flex items-center">
        <Flag size="20" className="mr-3 text-grey-light" />
        <h4 className="font-normal text-20">{item.title}</h4>
      </div>
      <div className="typography leading-normal font-light my-3" dangerouslySetInnerHTML={{__html: item.description}} />
      <TimelineItemMeta item={item} />
    </div>
  );
}

export default TimelineMilestone;
