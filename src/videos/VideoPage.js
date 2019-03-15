import React from 'react';

import ItemState from '../context/ItemState';
import ItemContext from '../context/item-context';
import DraftContentPage from '../DraftContentPage';
import EditableVideo from '../forms/EditableVideo';
import VideoTips from './VideoTips';
import { Video } from 'react-feather';

function VideoPage(props) {
  return (
    <ItemState apiPath="videos" id={props.match.params.id}>
      <div className="font-sans">
        <DraftContentPage
          tipsComponent={VideoTips}
          authorshipLabel="Videographer"
          authorshipIcon={Video}
        >
          <ItemContext.Consumer>
            {(context) => (
              <div className="max-w-lg xl:max-w-xl xxl:max-w-2xl mx-auto px-6 md:px-10 pb-8">
                <EditableVideo
                  value={context.data.video_url}
                  videoId={context.data.video_id}
                  videoType={context.data.video_type}
                  onChange={(e) => context.change('video_url', e.target.value)}
                  onEditingDone={context.save}
                  updating={context.isUpdating}
                />
              </div>
            )}
          </ItemContext.Consumer>
        </DraftContentPage>
      </div>
    </ItemState>
  );
}

export default VideoPage;
