import React from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../context/user-context';
import { LogIn } from 'react-feather';
import fiftyYears from '../fifty-years.svg';
import logo from '../logo.png';

function PageHeader(props) {
  const showLogin = props.user ? !props.user.email : true;

  return (
    <header className="bg-white text-center p-8">
      <div className="pt-2 pb-4">
        <img src={logo} className="" />
      </div>
      <h1 className="pt-1"><img src={fiftyYears} alt="FIFTY YEARS" className="" /></h1>      
      <UserContext.Consumer>
        {context => (
          <React.Fragment>
            {!context.id && (
              <div className="absolute pin-t pin-r">
                <Link to="/login" className="block bg-grey p-2 text-white hover:bg-grey-dark focus:bg-grey-dark">
                  <LogIn size="21" className="mt-px ml-px mr-px" />
                </Link>
              </div>
            )}
          </React.Fragment>
        )}
      </UserContext.Consumer>
    </header>
  );
}

export default PageHeader;