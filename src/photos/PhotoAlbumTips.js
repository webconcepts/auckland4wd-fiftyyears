import React from 'react';

import TipsSection from '../common/TipsSection';
import TipsHeader from '../common/TipsHeader';
import TipsInlineHeader from '../common/TipsInlineHeader';

function PhotoAlbumTips() {
  return (
    <TipsSection cacheKey="photo-album-tips" title="Tips for creating a photo album">
      <TipsHeader>Upload good quality images</TipsHeader>
      <p>
        Smaller images will be generated from the photos you upload, in sizes suitable to display on
        this website. The better the quality of the original photo, the better results, although
        bigger files will take longer to upload.
      </p>
      <TipsHeader>Add a date, even if it's just your best guess</TipsHeader>
      <p>
        A date is needed to place your album on a timeline. If all you can figure out is the
        year, you can leave the day and month blank.
      </p>
      <p>
        <TipsInlineHeader>Description, location, photographer are optional</TipsInlineHeader>
        Leave them blank if they're not needed for your album.
      </p>
      <p>
        <TipsInlineHeader>Only upload .jpg (jpeg) images</TipsInlineHeader>
        If you need help converting your images, <a href="https://www.google.com/search?q=convert+images+to+jpeg">ask google first</a>.
      </p>
      <p>
        <TipsInlineHeader>Need some help?</TipsInlineHeader>
        <a href="mailto:jeremy@auckland4wd.org.nz" title="Ask for help">email Jeremy</a>
      </p>
    </TipsSection>
  );
}

export default PhotoAlbumTips;
