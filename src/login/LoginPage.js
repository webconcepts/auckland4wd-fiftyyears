import React from 'react';
import { Link } from 'react-router-dom';

import ContentPageFooter from '../common/ContentPageFooter';
import LoginForm from './LoginForm';

function LoginPage() {
  return (
    <React.Fragment>
      <div className="max-w-md mx-auto px-6 pb-8">
        <h2 className="font-light text-32 my-10">Login</h2>
        <div className="typography leading-normal font-light mb-12">
          <p>
            We use your email address to identify you. No username, no password, just your email address.
          </p>
          <p>
            Enter your email address below and you will be sent an email with a link. Follow that link, and you'll be logged in.
          </p>
        </div>
        <LoginForm />
      </div>
      <ContentPageFooter linkBackTo="/" />
    </React.Fragment>
  );
}

export default LoginPage;
