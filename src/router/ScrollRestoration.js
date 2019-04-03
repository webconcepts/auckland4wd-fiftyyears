import React from 'react';

import ScrollContext from '../context/scroll-context';

class ScrollRestoration extends React.Component {
  componentDidMount() {
    window.scrollTo(0, this.context.get(this.props.url));
    window.addEventListener('scroll', this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listener);
  }

  listener = () => {
    this.context.set(this.props.url, window.scrollY);
  }

  render() {
    return null;
  }
}

ScrollRestoration.contextType = ScrollContext;

export default ScrollRestoration;
