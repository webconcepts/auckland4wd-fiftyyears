import React from 'react';
import { fetchApi, onStatus } from '../utils/api';

import Editable from '../forms/Editable';

class PhotoCaption extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue,
      error: false
    };

    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleCaptionChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSave() {
    const body = { description: this.state.value };

    fetchApi('PATCH', 'drafts/photo-albums/' + this.props.album + '/photos/' + this.props.photo, body)
      .then((response) => onStatus(response, 200))
      .then(() => this.setState({ error: false }))
      .catch(() => this.setState({ error: true }));
  }

  render() {
    return (
      <div
        hidden={this.props.hidden}
        className="absolute z-1 pin-b pin-l w-full p-3 bg-tint-black text-14 lg:text-16 lg:p-4 xl:px-6"
      >
        <Editable
          name="caption"
          value={this.state.value}
          onChange={this.handleCaptionChange}
          onEditingDone={this.handleSave}
          buttonColor="white"
          className="font-light inline-block pb-1"
        />
      </div>
    );
  }
}

export default PhotoCaption;
