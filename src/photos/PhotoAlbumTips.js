import React from 'react';

import TipsSection from '../common/TipsSection';
import TipsHeader from '../common/TipsHeader';
import TipsInlineHeader from '../common/TipsInlineHeader';

function PhotoAlbumTips() {  
  const linkClasses = 'text-havelock hover:text-blackish focus:text-blackish';

  return (
    <TipsSection key="photo-album-tips" title="Tips for creating a photo album">
      <TipsHeader>Upload good quality images</TipsHeader>
      <p>
        Smaller images will be generated from the photos you upload, in sizes suitable to display on 
        this website. The better the quality of the original photo, the better results, although 
        bigger files will take longer to upload.
      </p>
      <TipsHeader>Only upload .jpg images</TipsHeader>
      <p>
        Only .jpg (jpeg) images are supported. If you need help converting your images from another 
        format, <a href="https://www.google.com/search?q=convert+images+to+jpeg">ask google first</a>.
      </p>
      <TipsHeader>Please add a date</TipsHeader>
      <p>
        We need a date so we can place your album on a timeline. You can leave the day blank, but please 
        add a month and year. If you don't know exactly, make it your best guess.
      </p>
      <TipsHeader>Description, location, photographer are optional</TipsHeader>
      <p>
        Feel free to leave these blank if they're not needed for your album. Any blank fields will not 
        be shown on the published album.
      </p>
      <p>
        <TipsInlineHeader>Need help?</TipsInlineHeader>
        <a href="mailto:jeremy@auckland4wd.org.nz" title="Ask for help">email Jeremy</a>
      </p>
    </TipsSection>
  );
}

export default PhotoAlbumTips;