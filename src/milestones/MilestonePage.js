import React from 'react';

import ItemState from '../context/ItemState';
import DraftContentPage from '../DraftContentPage';
import MilestoneTips from './MilestoneTips';

function MilestonePage(props) {
  return (
    <ItemState apiPath="milestones" id={props.match.params.id}>
      <DraftContentPage
        TipsComponent={MilestoneTips}
        includeAuthorship={false}
        includeLocation={false}
      />
    </ItemState>
  );
}

export default MilestonePage;
