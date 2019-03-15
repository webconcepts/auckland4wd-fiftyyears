import React from 'react';
import { Link } from 'react-router-dom';
import { fetchApi, jsonOnStatus } from './utils/api';

import Spinner from './common/Spinner';
import FeedbackMessage from './common/FeedbackMessage';

class DraftsList extends React.Component {
  state = {
    albums: [],
    videos: [],
    isLoadingAlbums: true,
    isLoadingVideos: true,
    isError: false
  }

  componentDidMount() {
    fetchApi('GET', 'drafts/photo-albums')
      .then((response) => jsonOnStatus(response, 200))
      .then((json) => this.setState({ albums: json.data, isLoadingAlbums: false }))
      .catch(() => this.setState({ isError: true, isLoadingAlbums: false }));

    fetchApi('GET', 'drafts/videos')
      .then((response) => jsonOnStatus(response, 200))
      .then((json) => this.setState({ videos: json.data, isLoadingVideos: false }))
      .catch(() => this.setState({ isError: true, isLoadingVideos: false }));
  }

  render() {
    if (this.state.isLoadingAlbums || this.state.isLoadingVideos) {
      return <Spinner size="50" className="py-10" />;
    }

    return (
      <div>
        <h2 className="font-light text-24 mb-10">Your drafts</h2>
        { this.state.isError &&
          <FeedbackMessage type="error" className="mb-8">
            Uh oh! Sorry, your draft videos could not be retrieved from the server.
          </FeedbackMessage>
        }
        { this.state.albums.length && <h3 className="font-semibold text-18 text-buttercup mt-10 mb-6">Photo albums</h3>}
        { this.state.albums.map((album, i) =>
          <Link key={album.id} to={`/album/${album.id}`}>
            <div className="my-6 text-havelock">
              <h4>{album.title}</h4>
            </div>
          </Link>
        )}
        { this.state.videos.length && <h3 className="font-semibold text-18 text-monza mt-10 mb-6">Videos</h3>}
        { this.state.videos.map((video, i) =>
          <Link key={video.id} to={`/video/${video.id}`}>
            <div className="my-6 text-havelock">
              <h4>{video.title}</h4>
            </div>
          </Link>
        )}
        <p className="leading-normal font-light mt-10">
          Thank you for your contribution! Keep it up. We will let you know when
          we start to publish everyone's content here for us all to enjoy.
        </p>
      </div>
    );
  }
}

export default DraftsList;
