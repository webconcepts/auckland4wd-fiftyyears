import React from 'react';

import ScrollContext from './scroll-context';

class ScrollState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollPositions: {}
    };

    this.handleGet = this.handleGet.bind(this);
    this.handleSet = this.handleSet.bind(this);
  }

  componentDidMount() {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }

  handleGet(url) {
    return this.state.scrollPositions[url] ? this.state.scrollPositions[url] : 0;
  }

  handleSet(url, scrollY) {
    let scrollPositions = this.state.scrollPositions;
    scrollPositions[url] = scrollY;
    this.setState({ scrollPositions: scrollPositions });
  }

  render() {
    return (
      <ScrollContext.Provider
        value={{
          set: this.handleSet,
          get: this.handleGet,
        }}
        children={this.props.children}
      />
    );
  }
}

export default ScrollState;
