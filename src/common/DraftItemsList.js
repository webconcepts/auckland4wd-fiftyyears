import React from 'react';
import { Link } from 'react-router-dom';
import { monthName } from '../utils/date';

function DraftItemsList({ items, label, color, linkPath }) {
  return (
    <React.Fragment>
      <h3 className={`font-semibold text-18 text-${color} uppercase mt-10 mb-6`}>{label}</h3>
      { items.map((item, i) =>
        <Link key={item.id} to={`/${linkPath}/${item.id}`} className={`text-white no-underline hover:text-${color} focus:text-${color}`}>
          <div className="my-6">
            <h4 className="font-semibold text-18 py-2">{item.title}</h4>
            {(item.approx_year || item.location) && (
              <p className="list-reset text-15 text-grey-light font-light">
                {item.approx_year && (
                  <React.Fragment>
                    {item.approx_month && monthName(item.approx_month) + ' '}
                    {item.approx_year}
                  </React.Fragment>
                )}
                {item.approx_year && item.location && (
                  <span className="px-2">&ndash;</span>
                )}
                {item.location && (
                  <React.Fragment>{item.location}</React.Fragment>
                )}
              </p>
            )}
          </div>
        </Link>
      )}
    </React.Fragment>
  );
}

export default DraftItemsList;
