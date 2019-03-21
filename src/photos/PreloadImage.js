import React from 'react';

class PreloadImage extends React.Component {
  state = {
    isLoaded: false
  }

  componentDidMount() {
    const image = new Image();
    image.onload = () => this.setState({ isLoaded: true });
    image.src = this.props.src;
  }

  render() {
    if (!this.state.isLoaded) {
      return this.props.fallback ? this.props.fallback() : null;
    } else {
      return this.props.children ? this.props.children : null;
    }
  }
}

export default PreloadImage;
