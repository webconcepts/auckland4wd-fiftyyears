import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { ChevronLeft, ChevronRight, X, Copy } from 'react-feather';

class PhotoControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: localStorage.getItem('fiftyyears:photo-controls-hidden') != 'true',
    };

    if (this.props.onToggleVisibility) {
      this.props.onToggleVisibility(true);
    }

    this.toggleButton = React.createRef();

    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
    case 37: // left arrow
      this.setState({ redirectPrevious: true });
      break;
    case 39: // right arrow
      this.setState({ redirectNext: true });
      break;
    case 27: // esc
      this.setState({ redirectAlbum: true });
      break;
    }
  }

  toggleVisibility(event) {
    event.preventDefault();

    const visible = !this.state.visible;
    this.setState({ visible: visible });
    localStorage.setItem('fiftyyears:photo-controls-hidden', !visible);

    if (this.props.onToggleVisibility) {
      this.props.onToggleVisibility(visible);
    }

    this.toggleButton.current.blur();
  }

  render() {
    if (this.state.redirectPrevious && this.props.previous) {
      return <Redirect to={'' + this.props.previous} />;
    }

    if (this.state.redirectNext && this.props.next) {
      return <Redirect to={'' + this.props.next} />;
    }

    if (this.state.redirectAlbum) {
      return <Redirect to={`/album/${this.props.album}`} />;
    }

    return (
      <React.Fragment>
        { this.props.previous && (
          <Link
            to={'' + this.props.previous}
            title="Previous photo"
            className="absolute flex items-center justify-start pin-t pin-l w-1/5 h-full pl-4 text-white hover:text-havelock focus:text-havelock"
          >
            <ChevronLeft size="44" hidden={!this.state.visible} />
          </Link>
        )}
        { this.props.next && (
          <Link
            to={'' + this.props.next}
            title="Next photo"
            className="absolute flex items-center justify-end pin-t pin-r w-1/5 h-full pr-4 text-white hover:text-havelock focus:text-havelock"
          >
            <ChevronRight size="44" hidden={!this.state.visible} />
          </Link>
        )}
        <Link
          to={`/album/${this.props.album}`}
          title="Close and return to album"
          className="absolute pin-t pin-r p-6 text-white hover:text-havelock focus:text-havelock"
        >
          <X size="28" hidden={!this.state.visible} />
        </Link>
        <button
          ref={this.toggleButton}
          title="Toggle controls"
          onClick={this.toggleVisibility}
          className={`${this.state.visible ? 'text-grey' : 'text-grey-dark'} absolute pin-t pin-l p-6 hover:text-havelock focus:text-havelock`}
        >
          <Copy size="16" />
        </button>
      </React.Fragment>
    );
  }
}

export default PhotoControls;
