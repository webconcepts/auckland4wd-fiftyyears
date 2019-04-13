import React from 'react';

class FullsizeImageDimensions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgWidth: null,
      imgHeight: null
    };
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
    const sizes = FullsizeImageDimensions.imageSizes();
    for (let i = 0; i < sizes.length; i++) {
      if ((sizes[i][0] > window.innerWidth && sizes[i][1] > window.innerHeight) || i == sizes.length - 1) {
        this.setState({ imgWidth: sizes[i][0], imgHeight: sizes[i][1] });
        break;
      }
    }
  }

  render() {
    return this.state.imgWidth ? this.props.children(this.state) : null;
  }
}

export default FullsizeImageDimensions;
