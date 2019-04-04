import React from 'react';

import TimelineContext from '../context/timeline-context';
import TimelineItem from './TimelineItem';
import TimelineMilestone from './TimelineMilestone';
import Spinner from '../common/Spinner';
import FeedbackMessage from '../common/FeedbackMessage';

const years = Array.from({length: 51}, (x,i) => i + 1969);

function Timeline({ data, isLoading, isError }) {
  if (isLoading) {
    return <Spinner size="50" className="py-10" />;
  } else if (isError) {
    return (
      <FeedbackMessage type="error" className="mb-8">
        Uh oh! There was a problem loading the timeline. Please refresh the page to try again.
      </FeedbackMessage>
    );
  }

  const yearClasses = 'pt-5 pb-3 sm:absolute sm:pin-l';
  const yearH3Classes = 'text-29 font-normal text-grey';

  return (
    <div className="relative">
      <div className="py-4 sm:ml-32 sm:border-l-8 sm:border-blackish-light sm:pl-8">
        {years.map((year) => data[year] && (
          <React.Fragment key={year}>
            <div className={yearClasses}>
              <h3 className={yearH3Classes}>{year}</h3>
            </div>
            {data[year].map(item => item.type
              ? <TimelineItem key={item.id} item={item} />
              : <TimelineMilestone key={item.id} item={item} />
            )}
          </React.Fragment>
        ))}
        {data[''] && (
          <React.Fragment key="misc">
            <div className={yearClasses}>
              <h3 className={yearH3Classes}>misc.</h3>
            </div>
            {data[''].map(item => item.type
              ? <TimelineItem key={item.id} item={item} />
              : <TimelineMilestone key={item.id} item={item} />
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Timeline;
