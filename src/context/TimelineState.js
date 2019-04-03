import React from 'react';
import { fetchApi, jsonOnStatus } from '../utils/api';

import TimelineContext from './timeline-context';

class TimelineState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      lastUpdated: null,
      isLoading: true,
      isError: false
    };

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.handleUpdate();
  }

  handleUpdate() {
    fetchApi('GET', 'timeline')
      .then((response) => jsonOnStatus(response, 200))
      .then((json) => {
        if (json.updated_at != this.state.lastUpdated) {
          this.setState({
            data: json.data ? json.data : {},
            lastUpdated: json.updated_at
          });
        }
        this.setState({ isError: false, isLoading: false });
      })
      .catch(() => this.setState({ isError: true, isLoading: false }));
  }

  render() {
    return (
      <TimelineContext.Provider
        value={{
          data: this.state.data,
          lastUpdated: this.state.lastUpdated,
          isLoading: this.state.isLoading,
          isError: this.state.isError,
          update: this.handleUpdate
        }}
      >
        {this.props.children}
      </TimelineContext.Provider>
    );
  }
}

export default TimelineState;
