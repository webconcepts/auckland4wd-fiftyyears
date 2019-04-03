import React from 'react';
import { Redirect } from 'react-router-dom';

import ItemPhotosContext from '../context/item-photos-context';
import FullscreenImage from './FullscreenImage';
import PhotoControls from './PhotoControls';
import DraftPhotoControls from './DraftPhotoControls';
import PreloadImage from './PreloadImage';
import Editable from '../forms/Editable';
import PageSpinner from '../common/PageSpinner';

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
    if (this.context.isLoading) {
      return <PageSpinner />;
    }

    const { photo, next, previous } = this.context.get(this.props.id);
    if (!photo) {
      return <Redirect to={this.props.albumUrl} />;
    }

    const ControlsComponent = this.props.editable ? DraftPhotoControls : PhotoControls;

    return (
      <section className="fixed w-full h-full z-20 bg-blackish">
        { photo && (
          <React.Fragment>
            <FullscreenImage src={this.context.getSrc(photo.key, this.state.imgWidth, this.state.imgHeight, 'inside')}>
              {(this.props.editable || photo.description) && (
                <div
                  hidden={!this.state.controlsVisible}
                  className="absolute z-1 pin-b pin-l w-full p-3 bg-tint-black text-14 lg:text-16 lg:p-4 xl:px-6"
                >
                  {this.props.editable ? (
                    <Editable
                      name="caption"
                      value={photo.description}
                      onChange={(e) => this.context.change(photo.key, { description: e.target.value })}
                      onEditingDone={() => this.context.save(photo.key)}
                      buttonColor="white"
                      className="font-light inline-block pb-1"
                    />
                  ) : (
                    <div className="font-light inline-block pb-1">
                      {photo.description}
                    </div>
                  )}
                </div>
              )}
              {next && (
                <PreloadImage src={this.context.getSrc(next.key, this.state.imgWidth, this.state.imgHeight, 'inside')} />
              )}
            </FullscreenImage>
            <ControlsComponent
              id={photo.id}
              photoKey={photo.key}
              album={this.props.album}
              albumUrl={this.props.albumUrl}
              previous={previous ? previous.id : false}
              next={next ? next.id : false}
              likes={photo.likes}
              hidden={!this.state.controlsVisible}
              onToggleVisibility={this.handleControlsToggle}
              onLike={() => this.context.like(photo.key)}
            />
          </React.Fragment>
        )}
      </section>
    );
  }
}

PhotoView.contextType = ItemPhotosContext;

export default PhotoView;
