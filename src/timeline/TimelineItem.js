import React from 'react';
import { Link } from 'react-router-dom';
import { imageSrc } from '../utils/images';

import TimelineItemMeta from './TimelineItemMeta';
import { Film } from 'react-feather';

function TimelineItem({ item }) {
  return (
    <Link
      to={`/${item.type}/${item.id}`}
      key={item.id}
      className="flex items-center p-3 -mx-3 text-white no-underline sm:mx-0 hover:bg-blackish-light focus:bg-blackish-light"
    >
      {item.cover_photo_id && (
        <img
          src={imageSrc(item.id, item.cover_photo_id, 125, 125)}
          className="w-20 h-20 mr-4 sm:w-24 sm:h-24 sm:mr-8 lg:w-28 lg:h-28" alt={item.title}
        />
      )}
      <div className="pb-2">
        <h4 className="font-normal text-20 sm:text-24 sm:mb-3">
          {item.title}
          {item.type == 'video' && <Film size="19" className="text-havelock ml-3 -mb-px" />}
        </h4>
        <TimelineItemMeta item={item} />
        {item.authorship && (
          <p className="mt-2 font-light text-14 text-grey">{item.authorship}</p>
        )}
      </div>
    </Link>
  );
}

export default TimelineItem;
