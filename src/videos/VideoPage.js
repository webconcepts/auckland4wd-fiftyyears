import React from 'react';

import ItemState from '../context/ItemState';
import ItemContext from '../context/item-context';
import ContentPage from '../ContentPage';
import VideoEmbed from './VideoEmbed';
import { Video } from 'react-feather';

function VideoPage(props) {
  return (
    <ItemState apiPath="videos" id={props.match.params.id}>
      <ContentPage authorshipIcon={Video} authorshipLabel="Videographer">
        <ItemContext.Consumer>
          {(context) => (
            <div className="max-w-lg xl:max-w-xl xxl:max-w-2xl mx-auto pb-8">
              <VideoEmbed id={context.data.video_id} type={context.data.video_type} className="md:mx-10" />
            </div>
          )}
        </ItemContext.Consumer>
      </ContentPage>
    </ItemState>
  );
}

export default VideoPage;
