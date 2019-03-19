import React from 'react';

import TipsSection from '../common/TipsSection';
import TipsHeader from '../common/TipsHeader';
import TipsInlineHeader from '../common/TipsInlineHeader';

function MilestoneTips() {
  return (
    <TipsSection cacheKey="milestone-tips" title="Tips for adding a milestone">
      <TipsHeader>Milestones are for words</TipsHeader>
      <p>
        Milestones are for documenting a point of time in our history, that isn't accompanied
        with an album of photos or with a video.
      </p>
      <TipsHeader>Add a date, even if it's just your best guess</TipsHeader>
      <p>
        A date is needed to place your milestone on a timeline. If all you can figure out is the
        year, you can leave the day and month blank.
      </p>
      <TipsHeader>Short title, long description</TipsHeader>
      <p>
        Keep the title short, and put all the gory details in the description. But if you can
        fit everything in a short title, you can leave the description blank.
      </p>
      <p>
        <TipsInlineHeader>Need some help?</TipsInlineHeader>
        <a href="mailto:jeremy@auckland4wd.org.nz" title="Ask for help">email Jeremy</a>
      </p>
    </TipsSection>
  );
}

export default MilestoneTips;
