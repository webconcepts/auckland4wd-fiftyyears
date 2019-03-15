import React from 'react';

function VideoEmbed(props) {
  return (
    <div className={`relative h-0 ${props.className}`} style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={props.type == 'youtube' ? `https://www.youtube.com/embed/${props.id}` :
          props.type == 'vimeo' ? `https://player.vimeo.com/video/${props.id}` : ''}
        frameBorder="0"
        allow={props.type == 'youtube' ? 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' : ''}
        allowFullScreen
        className="absolute pin-t pin-l w-full h-full"
      ></iframe>
    </div>
  );
}

export default VideoEmbed;
