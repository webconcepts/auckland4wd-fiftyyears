import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { fetchApi, handleJsonByStatus } from '../utils/api';

import FeedbackMessage from '../common/FeedbackMessage';

class VerifyPage extends React.Component {
  state = {
    verified: false,
    error: false,
    expired: false
  }

  componentDidMount() {
    fetchApi('POST', 'auth/token', { verification_code: this.props.match.params.code })
      .then((response) => handleJsonByStatus(response, {
        201: () => this.setState({ verified: true }),
        410: () => this.setState({ expired: true })
      }))
      .catch(() => this.setState({ error: true }));
  }
  
  render() {
    if (this.state.verified) {
      return <Redirect to="/" />
    }

    return (
      <div className="max-w-md mx-auto">
        <h2 className="font-normal text-grey uppercase mb-16 tracking-wide text-center my-12">logging in...</h2>
        { this.state.error && (
          <FeedbackMessage type="error">
            Uh oh! Something went wrong. Please try to <Link to="/login" className="text-white">login again</Link>.
          </FeedbackMessage>
        )}
        { this.state.expired && (
          <FeedbackMessage type="error">
            Sorry, your login link had expired. A new one has been emailed to you.
          </FeedbackMessage>
        )}
      </div>
    );
  }
}

export default VerifyPage;