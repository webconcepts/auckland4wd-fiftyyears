import React from 'react';

class FullscreenImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      maxHeight: '100%',
      loaded: false
    };

    this.resizeScheduled = false;
    this.container = React.createRef();

    this.scheduleResizeImage = this.scheduleResizeImage.bind(this);
    this.resizeImage = this.resizeImage.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.scheduleResizeImage); 
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.scheduleResizeImage);
  }

  scheduleResizeImage() {
    if (this.resizeScheduled == false) {
      this.resizeScheduled = true;
      window.requestAnimationFrame(this.resizeImage);
    }
  }

  resizeImage() {
    this.resizeScheduled = false;
    this.setState({
      maxHeight: this.container.current.clientHeight + 'px'
    });
  }

  handleLoad() {
    this.scheduleResizeImage();
    this.setState({ loaded: true });

    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  render() {
    return (
      <div ref={this.container} className="absolute flex items-center justify-center pin-t pin-l pin-b pin-r">
        <div className="relative">
          <img 
            src={this.props.src}
            onLoad={this.handleLoad}
            className="max-w-full float-left" 
            style={{maxHeight: this.state.maxHeight}}  
          />
          {this.state.loaded && this.props.children}
        </div>
      </div>
    );
  }
}

export default FullscreenImage;
