import React from 'react';
import { fetchApi, jsonOnStatus } from '../utils/api';

import Spinner from './Spinner';
import FeedbackMessage from './FeedbackMessage';
import DraftItemsList from './DraftItemsList';

class DraftsList extends React.Component {
  state = {
    albums: [],
    videos: [],
    isLoadingAlbums: true,
    isLoadingVideos: true,
    isLoadingMilestones: true,
    isError: false
  }

  componentDidMount() {
    const urlSuffix = this.props.user == 'all' ? '?user=all' : '';

    fetchApi('GET', 'drafts/photo-albums' + urlSuffix)
      .then((response) => jsonOnStatus(response, 200))
      .then((json) => this.setState({ albums: json.data, isLoadingAlbums: false }))
      .catch(() => this.setState({ isError: true, isLoadingAlbums: false }));

    fetchApi('GET', 'drafts/videos' + urlSuffix)
      .then((response) => jsonOnStatus(response, 200))
      .then((json) => this.setState({ videos: json.data, isLoadingVideos: false }))
      .catch(() => this.setState({ isError: true, isLoadingVideos: false }));

    fetchApi('GET', 'drafts/milestones' + urlSuffix)
      .then((response) => jsonOnStatus(response, 200))
      .then((json) => this.setState({ milestones: json.data, isLoadingMilestones: false }))
      .catch(() => this.setState({ isError: true, isLoadingMilestones: false }));
  }

  render() {
    if (this.state.isLoadingAlbums || this.state.isLoadingVideos || this.state.isLoadingMilestones) {
      return <Spinner size="50" className="py-10" />;
    }

    return (
      <div>
        <h2 className="font-light text-32 mb-10">
          {this.props.user == 'all' ? 'All drafts' : 'Your drafts'}
        </h2>
        { this.state.isError &&
          <FeedbackMessage type="error" className="mb-8">
            Uh oh! Sorry, the drafts could not be retrieved from the server.
          </FeedbackMessage>
        }
        {this.state.albums.length > 0 && (
          <DraftItemsList items={this.state.albums} label="Photo albums" color="buttercup" linkPath="album" />
        )}
        {this.state.videos.length > 0 && (
          <DraftItemsList items={this.state.videos} label="Videos" color="monza" linkPath="video" />
        )}
        {this.state.milestones.length > 0 && (
          <DraftItemsList items={this.state.milestones} label="Milestones" color="havelock" linkPath="milestone" />
        )}
        {!this.props.user && (
          <p className="leading-normal font-light mt-10">
            Thank you for your contribution! Keep it up. We will let you know when
            we start to publish everyone's content here for us all to enjoy.
          </p>
        )}
      </div>
    );
  }
}

export default DraftsList;
