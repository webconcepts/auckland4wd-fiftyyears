import React from 'react';
import { Redirect } from 'react-router-dom';

import ItemPhotosContext from '../context/item-photos-context';
import FullscreenImage from './FullscreenImage';
import DraftPhotoControls from './DraftPhotoControls';
import PreloadImage from './PreloadImage';
import Editable from '../forms/Editable';

class PhotoView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgWidth: null,
      imgHeight: null,
      controlsVisible: localStorage.getItem('fiftyyears:photo-controls-hidden') != 'true',
    };

    this.handleControlsToggle = this.handleControlsToggle.bind(this);
  }

  static imageSizes() {
    return [
      [670, 670],
      [960, 960],
      [1280, 1280],
      [1520, 855]
    ];
  }

  componentDidMount() {
    // set resize dimensions of image based on window size
    const sizes = PhotoView.imageSizes();
    for (let i = 0; i < sizes.length; i++) {
      if ((sizes[i][0] > window.innerWidth && sizes[i][1] > window.innerHeight) || i == sizes.length - 1) {
        this.setState({ imgWidth: sizes[i][0], imgHeight: sizes[i][1] });
        break;
      }
    }
  }

  handleControlsToggle() {
    const visible = !this.state.controlsVisible;

    this.setState({ controlsVisible: visible });
    localStorage.setItem('fiftyyears:photo-controls-hidden', !visible);
  }

  render() {
    const { photo, next, previous } = this.context.get(this.props.id);

    if (!photo) {
      return <Redirect to={`/album/${this.props.album}`} />;
    }

    return (
      <section className="fixed w-full h-full z-20 bg-blackish">
        { photo && (
          <React.Fragment>
            <FullscreenImage src={this.context.getSrc(photo.key, this.state.imgWidth, this.state.imgHeight, 'inside')}>
              <div
                hidden={!this.state.controlsVisible}
                className="absolute z-1 pin-b pin-l w-full p-3 bg-tint-black text-14 lg:text-16 lg:p-4 xl:px-6"
              >
                <Editable
                  name="caption"
                  value={photo.description}
                  onChange={(e) => this.context.change(photo.key, { description: e.target.value })}
                  onEditingDone={(e) => this.context.save(photo.key)}
                  buttonColor="white"
                  className="font-light inline-block pb-1"
                />
              </div>
              {next && <PreloadImage src={this.context.getSrc(next.key, this.state.imgWidth, this.state.imgHeight, 'inside')} />}
            </FullscreenImage>
            <DraftPhotoControls
              id={photo.id}
              photoKey={photo.key}
              album={this.props.album}
              previous={previous ? previous.id : false}
              next={next ? next.id : false}
              hidden={!this.state.controlsVisible}
              onToggleVisibility={this.handleControlsToggle}
            />
          </React.Fragment>
        )}
      </section>
    );
  }
}

PhotoView.contextType = ItemPhotosContext;

export default PhotoView;
