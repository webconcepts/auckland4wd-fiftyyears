import React from 'react';
import { fetchApi, handleJsonByStatus } from '../utils/api';

import FullscreenImage from './FullscreenImage';
import PhotoCaption from './PhotoCaption';
import PhotoControls from './PhotoControls';

class PhotoView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      next: null,
      previous: null,
      loading: true
    };

    this.handleControlsToggle = this.handleControlsToggle.bind(this);
    this.preloadNext = this.preloadNext.bind(this);
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
    fetchApi('GET', 'drafts/photo-albums/' + this.props.album + '/photos/' + this.props.id)
      .then((response) => handleJsonByStatus(response, {
        200: (json) => {
          this.setState(json.data);
          this.setState({
            next: json.next,
            previous: json.previous,
            loading: false
          });
        }
        // 404: redirect to page not found
      }))
      .catch(() => this.setState({ error: true, loading: false }));

    const sizes = PhotoView.imageSizes();

    // set resize dimensions of image based on window size
    for (let i = 0; i < sizes.length; i++) {
      if ((sizes[i][0] > window.innerWidth && sizes[i][1] > window.innerHeight) || i == sizes.length - 1) {
        this.setState({
          resizeWidth: sizes[i][0],
          resizeHeight: sizes[i][1]
        });
        break;
      }
    }
  }

  handleControlsToggle(visible) {
    this.setState({ controlsVisible: visible });
  }

  preloadNext() {
    if (this.state.next) {
      (new Image()).src = this.imageSrc(this.state.next);
    }
  }

  imageSrc(id) {
    if (!this.state.resizeWidth) {
      return '';
    }

    const resize = `${this.state.resizeWidth}x${this.state.resizeHeight}inside`;
    const key = `${process.env.REACT_APP_S3_KEY_PREFIX}/${this.props.album}/${id}`;

    return `${process.env.REACT_APP_S3_URL}${resize}/${key}`;
  }

  render() {
    return (
      <section className="fixed w-full h-full z-20 bg-blackish font-sans">
        <FullscreenImage src={this.state.id ? this.imageSrc(this.state.id) : ''} onLoad={this.preloadNext}>
          { this.state.id && (
            <PhotoCaption
              album={this.props.album}
              photo={this.props.id}
              initialValue={this.state.description}
              hidden={!this.state.controlsVisible}
            />
          )}
        </FullscreenImage>
        <PhotoControls
          album={this.props.album}
          previous={this.state.previous}
          next={this.state.next}
          onToggleVisibility={this.handleControlsToggle}
        />
      </section>
    );
  }
}

export default PhotoView;
