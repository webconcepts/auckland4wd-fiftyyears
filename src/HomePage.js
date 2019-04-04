import React from 'react';
import { Link } from 'react-router-dom';

import UserContext from './context/user-context';
import TimelineContext from './context/timeline-context';
import ScrollRestoration from './router/ScrollRestoration';
import PageHeader from './common/PageHeader';
import Button from './common/Button';
import Timeline from './timeline/Timeline';
import { Plus } from 'react-feather';

function HomePage(props) {
  return (
    <React.Fragment>
      <ScrollRestoration url={props.match.url} />
      <PageHeader />
      <div className="max-w-md mx-auto px-6 pt-10 pb-16">
        <p className="text-24 md:text-32 sm:text-center font-light pb-8 leading-tightish">
          Celebrating 50 years of four wheel driving.
        </p>
        <div className="sm:flex justify-center">
          <Button
            to="/contribute"
            label="Contribute"
            component={Link}
            iconComponent={Plus}
            iconColor="havelock"
            hoverColor="havelock"
            className="no-underline text-16 bg-blackish-light rounded pl-4 pr-8"
          />
          <p className="text-grey-light font-light leading-normal pt-4 md:text-18 sm:px-6 sm:py-2">
            Share your photos, videos and milestones.
          </p>
        </div>
      </div>
      <TimelineContext.Consumer>
        {context => (
          <div className="max-w-lg mx-auto px-6 pb-12">
            <Timeline {...context} />
            {!context.isLoading && (
              <React.Fragment>
                <p className="pt-16 text-20 text-white font-light leading-normal sm:text-center sm:text-24">
                  Thank you for 50 years of memories
                </p>
                <p className="py-3 text-12 text-grey leading-normal sm:text-14 sm:text-center">
                  All content is property of its respective owners.<br />
                  Please do not copy or repost without permission.
                </p>
              </React.Fragment>
            )}
          </div>
        )}
      </TimelineContext.Consumer>
    </React.Fragment>
  );
}

export default HomePage;
