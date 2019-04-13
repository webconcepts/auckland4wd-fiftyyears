import React from 'react';
import { Link } from 'react-router-dom';

import UserContext from './context/user-context';
import TimelineContext from './context/timeline-context';
import PageHeader from './common/PageHeader';
import ContentPageFooter from './common/ContentPageFooter';
import ToggleViewButton from './common/ToggleViewButton';
import CreateItemForm from './CreateItemForm';
import DraftsList from './common/DraftsList';
import Spinner from './common/Spinner';
import Timeline from './timeline/Timeline';
import { Image, Film, Bookmark, LogIn } from 'react-feather';

function ContributePage(props) {
  return (
    <React.Fragment>
      <div className="max-w-md mx-auto px-6 pb-24">
        <div className="typography leading-normal font-light mt-10 mb-8">
          <h2 className="font-light text-32 mb-6">
            Contribute
          </h2>
          <p>
            We hope that you will share your photos and videos, to help us
            document some of the clubs history that will be published here for
            everyone to enjoy.
          </p>
        </div>
        <ToggleViewButton
          label="Create a photo album"
          iconComponent={Image}
          iconColor="buttercup"
          hoverColor="buttercup"
          hideByDefault={true}
          onlyOnce={true}
        >
          <div className="mb-10">
            <CreateItemForm apiPath="photo-albums" urlPath="draft/photo-album" label="Photo album" />
          </div>
        </ToggleViewButton>
        <ToggleViewButton
          label="Create a video"
          iconComponent={Film}
          iconColor="monza"
          hoverColor="monza"
          hideByDefault={true}
          onlyOnce={true}
        >
          <CreateItemForm apiPath="videos" urlPath="draft/video" label="Video" />
        </ToggleViewButton>
        <ToggleViewButton
          label="Create a milestone"
          iconComponent={Bookmark}
          iconColor="havelock"
          hoverColor="havelock"
          hideByDefault={true}
          onlyOnce={true}
        >
          <CreateItemForm apiPath="milestones" urlPath="draft/milestone" label="Milestone" />
        </ToggleViewButton>
        <UserContext.Consumer>
          {context => (
            <React.Fragment>
              {!context.id && (
                <div className="absolute pin-t pin-r">
                  <Link to="/login" className="block bg-grey-dark p-2 text-white hover:bg-grey focus:bg-grey">
                    <LogIn size="21" className="mt-px ml-px mr-px" />
                  </Link>
                </div>
              )}
              {context.id && (
                <div className="mt-16">
                  <DraftsList />
                </div>
              )}
              {context.id && context.editor && (
                <div className="mt-16">
                  <DraftsList user="all" />
                </div>
              )}
            </React.Fragment>
          )}
        </UserContext.Consumer>
      </div>
      <ContentPageFooter linkBackTo="/" />
    </React.Fragment>
  );
}

export default ContributePage;
