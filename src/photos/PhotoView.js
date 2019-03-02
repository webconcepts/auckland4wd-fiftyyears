import React from 'react';
import { Link } from 'react-router-dom';
import Editable from '../forms/Editable';
import { ChevronLeft, ChevronRight, X, Copy } from 'react-feather';

class PhotoView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      controlsVisible: true,
      imageMaxHeight: '100%'
    };

    this.imageContainer = React.createRef();
    this.toggleControlsButton = React.createRef();

    this.toggleControls = this.toggleControls.bind(this);
    this.resizeImage = this.resizeImage.bind(this);
    this.scheduleResizeImage = this.scheduleResizeImage.bind(this);

    this.resizeScheduled = false;
  }

  toggleControls(event) {
    event.preventDefault();

    this.setState({
      controlsVisible: !this.state.controlsVisible
    });

    this.toggleControlsButton.current.blur();
  }

  scheduleResizeImage() {
    if (this.resizeScheduled == false) {
      this.resizeScheduled = true;
      window.requestAnimationFrame(this.resizeImage);
    }
  }

  resizeImage() {
    this.resizeScheduled = false;

    const height = this.imageContainer.current.clientHeight;

    this.setState({
      imageMaxHeight: height + 'px'
    });
  }

  componentDidMount() {
    this.resizeImage();
    window.addEventListener('resize', this.scheduleResizeImage);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.scheduleResizeImage);
  }

  render() {
    return (
      <div className="font-sans">

        <div className="absolute w-full h-full">

          {/*style={{ left: '2rem', right: '2rem', top: '2rem', bottom: '2rem' }}*/}
          <div ref={this.imageContainer} className="absolute flex items-center justify-center pin-t pin-l pin-b pin-r">
            <div className="relative">
              <img src="/demo-images/full1.png" className="max-w-full float-left" style={{maxHeight: this.state.imageMaxHeight}} />
              <div hidden={!this.state.controlsVisible} className="absolute z-1 pin-b pin-l w-full p-3 bg-tint-black text-14 lg:text-16 lg:p-4 xl:px-6">                
                <Editable name="caption" className="font-light inline-block pb-1" buttonColor="white" value="This is a caption underneath the photo" />
              </div>

            </div>
          </div>
          
          <a href="next" title="Previous photo" className="absolute flex items-center justify-start pin-t pin-l w-1/5 h-full pl-4 text-white hover:text-havelock focus:text-havelock">
            <ChevronLeft size="44" hidden={!this.state.controlsVisible} />
          </a>
          <a href="previous" title="Next photo" className="absolute flex items-center justify-end pin-t pin-r w-1/5 h-full pr-4 text-white hover:text-havelock focus:text-havelock">
            <ChevronRight size="44" hidden={!this.state.controlsVisible} />
          </a>
          <Link to="/album/1" title="Close and return to album" className="absolute pin-t pin-r p-6 text-white hover:text-havelock focus:text-havelock">
            <X size="28" hidden={!this.state.controlsVisible} />
          </Link>
          <button ref={this.toggleControlsButton} title="Toggle controls" onClick={this.toggleControls} className={`${this.state.controlsVisible ? 'text-grey' : 'text-grey-dark'} absolute pin-t pin-l p-6 hover:text-havelock focus:text-havelock`}>
            <Copy size="16" />
          </button>
        </div>

      </div>
    );
  }
}

export default PhotoView;