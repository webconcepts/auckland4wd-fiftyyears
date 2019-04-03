import React from 'react';

import ItemState from '../context/ItemState';
import DraftContentPage from '../DraftContentPage';
import MilestoneTips from './MilestoneTips';

function DraftMilestonePage(props) {
  return (
    <ItemState apiPath="milestones" id={props.match.params.id} draft={true}>
      <DraftContentPage
        TipsComponent={MilestoneTips}
        includeAuthorship={false}
        includeLocation={false}
      />
    </ItemState>
  );
}

export default DraftMilestonePage;
