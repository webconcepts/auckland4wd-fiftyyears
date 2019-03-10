import React from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../context/user-context';
import { LogIn } from 'react-feather';
import fiftyYears from '../img/fifty-years.svg';
import logo1 from '../img/logo1.jpg';
import logo2 from '../img/logo2.jpg';
import logo3 from '../img/logo3.png';

class PageHeader extends React.Component {
  state = {
    logoVisible: 1
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ logoVisible: 2 });
      window.setTimeout(() => { this.setState({ logoVisible: 3 }); }, 3600)
    }, 3200);
  }

  render() {
    const showLogin = this.props.user ? !this.props.user.email : true;

    return (
      <header className="bg-white text-center p-6 pb-8">
        <div className="relative pb-4 w-48 h-32 mx-auto">
          <div className={`absolute w-full ${this.state.logoVisible == 1 ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
            <img src={logo1} width="120" className="ml-1/2 -translateX-50" alt="NZ Four Wheel Drive Society" />
          </div>
          <div className={`absolute w-full ${this.state.logoVisible == 2 ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
            <img src={logo2} width="120" className="ml-1/2 -translateX-50" alt="Auckland 4WD Club" />
          </div>
          <div className={`absolute w-full pt-3 bg-white ${this.state.logoVisible == 3 ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
            <img src={logo3} width="192" className="ml-1/2 -translateX-50" alt="Auckland 4WD Club" />
          </div>
        </div>
        <h1 className="text-1 pt-2"><img src={fiftyYears} width="277" alt="FIFTY YEARS" /></h1>
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
}

export default PageHeader;
