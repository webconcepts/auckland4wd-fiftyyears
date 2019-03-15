import React from 'react';

import TipsSection from '../common/TipsSection';
import TipsHeader from '../common/TipsHeader';
import TipsInlineHeader from '../common/TipsInlineHeader';

function VideoTips() {
  return (
    <TipsSection cacheKey="video-tips" title="Tips for adding a video">
      <TipsHeader>Only YouTube or Vimeo videos are supported</TipsHeader>
      <p>
        If you have a video file to upload, upload it to YouTube or Vimeo first. On both platforms
        you can create 'unlisted' videos, if you don't want to share your video with the outside
        world.
      </p>
      <TipsHeader>Grab a link to your video</TipsHeader>
      <p>
        Copy the URL from the address bar. The share button will also get youo a link to the
        video. Hit the 'add video' button and paste in the link.
      </p>
      <TipsHeader>Add a date, even if it's just your best guess</TipsHeader>
      <p>
        A date is needed to place your video on a timeline. If all you can figure out is the
        year, you can leave the day and month blank.
      </p>
      <p>
        <TipsInlineHeader>Description, location, videographer are optional</TipsInlineHeader>
        Leave them blank if they're not needed for your album.
      </p>
      <p>
        <TipsInlineHeader>Need some help?</TipsInlineHeader>
        <a href="mailto:jeremy@auckland4wd.org.nz" title="Ask for help">email Jeremy</a>
      </p>
    </TipsSection>
  );
}

export default VideoTips;
