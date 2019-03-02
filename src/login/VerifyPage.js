import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { apiPost } from '../utils/api';
import FeedbackMessage from '../common/FeedbackMessage';

class VerifyPage extends React.Component {
  state = {
    verified: false,
    error: false,
    expired: false
  }

  componentDidMount() {
    apiPost('auth/token', { verification_code: this.props.match.params.code }, 
      {
        201: (json) => this.handleAuthTokenRetrieved(json),
        410: () => this.setState({ expired: true }),
        error: () => this.setState({ error: true })
      }     
    );
  }

  handleAuthTokenRetrieved(data) {
    this.props.onAuthTokenRetrieved(data);
    this.setState({ verified: true });
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