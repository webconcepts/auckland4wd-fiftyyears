import React from 'react';

import { Plus } from 'react-feather';

function PhotoGridAddItem({ onChange }, ref) {
  return (
    <div className="relative w-full h-0 pb-full">
      <label
        title="Upload your photos to add them to this album"
        className="absolute flex items-center justify-center w-full h-full cursor-pointer hover:text-havelock focus:text-havelock"
      >
        <Plus /> add photos
        <input
          ref={ref}
          name="Photos[Upload]"
          className="hidden"
          type="file"
          multiple={true}
          accept="image/jpeg"
          onChange={onChange}
        />
      </label>
    </div>
  );
}

export default React.forwardRef(PhotoGridAddItem);
