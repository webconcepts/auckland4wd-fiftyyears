import React from 'react';

import Editable from '../forms/Editable';

function ContentPageHeader(props) {
  // const Component = props.img ? ContentPageHeaderImage : ContentPageHeaderBasic;
  const Component = ContentPageHeaderBasic;

  return (
    <Component {...props}>
      { /* <h1 className="text-41 font-normal">{props.title}</h1> */ }
      <Editable
        name="title"
        tagName="h1"
        className="inline-block font-normal text-shadow text-29 md:text-34 lg:text-41"
        value={props.value}
        onChange={props.onChange}
        onEditingDone={props.onEditingDone}
      />
    </Component>
  );
}

function ContentPageHeaderImage(props) {
  return (
    <header className="relative overflow-hidden md:h-0 md:pb-1/4 lg:pb-1/5 bg-blackish-light ">
      <div className="absolute w-full h-full pin-b">
        <img src={props.img} alt="" className="h-full w-auto max-w-none ml-1/2 -translateX-50 md:h-auto md:w-full" />
      </div>

      <div className="relative w-full md:absolute md:pin-b">
        <div className="max-w-lg xl:max-w-xl mx-auto px-6 md:px-10 pt-24 pb-8">
          {props.children}
        </div>
      </div>
    </header>
  );
}

function ContentPageHeaderBasic(props) {
  return (
    <header className="bg-blackish-light ">
      <div className="max-w-lg xl:max-w-xl mx-auto px-6 md:px-10 pt-16 pb-6 md:pb-8">
        {props.children}
      </div>
    </header>
  );
}

export default ContentPageHeader;
