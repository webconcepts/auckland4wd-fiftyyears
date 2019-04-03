import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { ChevronLeft, ChevronRight, X, Copy, ThumbsUp } from 'react-feather';

class PhotoControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

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

    this.props.onToggleVisibility();
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
            className="absolute flex items-center justify-start pin-t pin-l w-1/5 h-full pl-4 text-white hover:text-havelock focus:text-havelock focus:outline-none"
          >
            <ChevronLeft size="44" hidden={this.props.hidden} />
          </Link>
        )}
        { this.props.next && (
          <Link
            to={'' + this.props.next}
            title="Next photo"
            className="absolute flex items-center justify-end pin-t pin-r w-1/5 h-full pr-4 text-white hover:text-havelock focus:text-havelock focus:outline-none"
          >
            <ChevronRight size="44" hidden={this.props.hidden} />
          </Link>
        )}
        <Link
          to={this.props.albumUrl}
          title="Close and return to album"
          className="absolute pin-t pin-r p-6 text-white hover:text-havelock focus:text-havelock focus:outline-none"
        >
          <X size="28" hidden={this.props.hidden} />
        </Link>
        <button
          title="Like this photo"
          onClick={this.props.onLike}
          className={`absolute z-1 pin-b pin-r p-6 ${this.props.likes > 0 ? 'text-buttercup' : 'text-white'} hover:text-havelock focus:text-havelock focus:outline-none`}
          hidden={this.props.hidden}
        >
          {this.props.likes > 0 && (
            <span className="block text-14 font-light pb-1 mr-1">{this.props.likes}</span>
          )}
          <ThumbsUp size="24" className="mr-1" />
        </button>
        <div className="absolute pin-t pin-l">
          <button
            ref={this.toggleButton}
            title="Toggle controls"
            onClick={this.toggleVisibility}
            className={`block float-left ${!this.props.hidden ? 'text-grey' : 'text-grey-dark'} p-6 pr-4 hover:text-havelock focus:text-havelock focus:outline-none`}
          >
            <Copy size="17" />
          </button>
          {this.props.children && (
            <span hidden={this.props.hidden}>
              {this.props.children}
            </span>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default PhotoControls;
