import React from 'react';

class Spinner extends React.Component {
  state = {
    visible: false
  };

  componentDidMount() {
    if (this.props.delay) {
      this.timeoutId = setTimeout(() => { this.setState({ visible: true }); }, this.props.delay * 1000);
    } else {
      this.setState({ visible: true });
    }
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    const px = this.props.size ? this.props.size + 'px' : '30px';

    return (
      <React.Fragment>
        { this.state.visible && (
          <div className={`flex items-center justify-center ${this.props.className}`}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width={px}
              height={px}
              viewBox="0 0 50 50"
              className="animate-rotate fill-current text-buttercup"
            >
              <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" />
            </svg>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Spinner;
