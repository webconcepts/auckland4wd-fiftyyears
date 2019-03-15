import React from 'react';

import Spinner from '../common/Spinner';
import TextFormField from './TextFormField';
import FormButton from './FormButton';
import ButtonForEditable from './ButtonForEditable';
import VideoEmbed from '../videos/VideoEmbed';
import { Plus, Check } from 'react-feather';

class EditableVideo extends React.Component {
  state = {
    isEditing: false,
    isUpdating: false
  }

  handleSave(e) {
    e.preventDefault();

    if (this.props.onEditingDone) {
      this.props.onEditingDone();
    }
    this.setState({
      isEditing: false,
      isUpdating: true // track if video triggered an update
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      this.setState({ isUpdating: false }); // the item save we triggered has completed
    }
  }

  render() {
    if (this.state.isUpdating && this.props.updating) {
      return <Spinner size="50" className="p-10" />;
    }

    return (
      <React.Fragment>
        {!this.props.videoId && !this.state.isEditing && (
          <button
            type="button"
            onClick={() => this.setState({ editing: true })}
            className="flex justify-center items-center bg-blackish-light text-white block w-full py-20"
          >
            <Plus /> <span className="pl-2">add video</span>
          </button>
        )}
        {this.state.isEditing && (
          <form onSubmit={(e) => this.handleSave(e)}>
            <TextFormField name="video_url" label="Video URL" value={this.props.value} onChange={this.props.onChange} />
            <p className="ml-1/4 -mt-2 mb-4 text-grey text-14">
              Insert a URL for a YouTube or Vimeo video
            </p>
            <FormButton label="add video" type="submit" iconComponent={Check} iconColor="conifer" hoverColor="conifer" />
          </form>
        )}
        {!this.state.isEditing && this.props.videoId && (
          <React.Fragment>
            <VideoEmbed id={this.props.videoId} type={this.props.videoType} className="mb-3" />
            <ButtonForEditable
              onClick={() => this.setState({ isEditing: true })}
              hasValue={true}
              multiline={true}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default EditableVideo;
