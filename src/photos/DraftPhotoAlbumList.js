import React from 'react';
import { Link } from 'react-router-dom';
import { fetchApi, jsonOnStatus } from '../utils/api';
import FeedbackMessage from '../common/FeedbackMessage';

class DraftPhotoAlbumList extends React.Component {
  state = {
    albums: [],
    apiError: false
  }

  componentDidMount() {
    fetchApi('GET', 'drafts/photo-albums')
      .then((response) => jsonOnStatus(response, 200))
      .then((json) => this.setState({ albums: json.data }))
      .catch(() => this.setState({ apiError: true }));
  }

  render() {
    if (!this.state.albums.length) {
      return <React.Fragment />;
    }

    return (
      <div>
        <h2 className="font-semibold text-18 text-grey mt-10 mb-6">Your draft photo albums</h2>
        <p className="leading-normal font-light">
          Thank you for your contribution! Keep it up. We will let you know when 
          everyone's albums are published for us all to enjoy.
        </p>
        { this.state.apiError && 
          <FeedbackMessage type="error" className="mb-8">
            Uh oh! Sorry, your draft albums could not be retrieved from the server.
          </FeedbackMessage>
        }
        { this.state.albums.map((album, i) => 
          <Link key={album.id} to={`/album/${album.id}`}>
            <div className="my-6 text-havelock">
              <h4>{album.title}</h4>
            </div>
          </Link>
        )}
      </div>
    );
  }
}

export default DraftPhotoAlbumList;