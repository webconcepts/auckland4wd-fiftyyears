import React from 'react';
import { Redirect } from 'react-router-dom';
import { fetchApi, jsonOnStatus } from '../utils/api';

import PageSpinner from '../common/PageSpinner';
import SlideshowAlbum from './SlideshowAlbum';

class Slideshow extends React.Component {
  interval = null;

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isPaused: false,
      isFinished: false,
      data: false,
      photos: false,
      nextAlbumData: false,
      albumOffset: this.props.isRandom ? null : 0,
      currentPhotoIndex: null
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.fetchNextAlbumData();
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nextAlbumData === false && this.state.nextAlbumData !== false) {
      this.interval = setInterval(() => this.handleNext(), this.props.photoDisplayTime * 1000);

      // for first album, trigger next to set first album state and fetch next in advance
      this.handleNext();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  fetchNextAlbumData() {
    const offset = this.state.albumOffset !== null ? this.state.albumOffset + 1 : null;

    fetchApi('GET', `slideshow?number=${this.props.photosPerAlbum}${offset !== null ? `&offset=${offset}` : ''}`)
      .then((response) => jsonOnStatus(response, 200))
      .then((json) => this.setState({
        nextAlbumData: json,
        albumOffset: offset,
        isLoading: false
      }))
      .catch(() => this.setState({ isFinished: true, isLoading: false }));
  }

  handleNext() {
    if (this.state.isPaused) {
      return;
    }

    if (this.state.photos[this.state.currentPhotoIndex + 1] !== undefined) {
      this.setState({ currentPhotoIndex: this.state.currentPhotoIndex + 1 });
    } else {
      this.setState({
        ...this.state.nextAlbumData,
        currentPhotoIndex: 0
      });
      this.fetchNextAlbumData();
    }
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
    case 80: // p
      this.setState({ isPaused: !this.state.isPaused });
      break;
    case 27: // esc
      this.setState({ isFinished: true });
      break;
    }
  }

  render() {
    if (this.state.isFinished) {
      return <Redirect to="/slideshow" />;
    }

    if (this.state.isLoading) {
      return <PageSpinner />;
    }

    return (
      <section className="fixed w-full h-full z-20 bg-blackish">
        <SlideshowAlbum key={this.state.data.id} data={this.state.data} photos={this.state.photos} currentIndex={this.state.currentPhotoIndex} />
        {this.state.nextAlbumData && (
          <SlideshowAlbum hidden={true} key={this.state.nextAlbumData.id} data={this.state.nextAlbumData.data} photos={this.state.nextAlbumData.photos} currentIndex={0} />
        )}
        {this.state.isPaused && (
          <div className="absolute pin-t pin-l pin-r text-center">
            <p className="inline-block px-6 py-2 bg-blackish">PAUSED</p>
          </div>
        )}
      </section>
    );
  }
}

export default Slideshow;
