import React from 'react';
import { Link } from 'react-router-dom';

import fiftyYears from '../img/fifty-years.svg';
import logo1 from '../img/logo1.jpg';
import logo2 from '../img/logo2.jpg';
import logo3 from '../img/logo3.png';

class PageHeader extends React.Component {
  state = {
    logoVisible: 1
  }

  componentDidMount() {
    this.timeoutId = window.setTimeout(() => {
      this.setState({ logoVisible: 2 });
      this.timeoutId = window.setTimeout(() => { this.setState({ logoVisible: 3 }); }, 3600)
    }, 3200);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    const showLogin = this.props.user ? !this.props.user.email : true;

    return (
      <header className="bg-white text-center py-6 pb-8">
        <div className="relative overflow-hidden pb-4 w-48 h-32 mx-auto">
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
        <h1 className="text-1 pt-2 px-12"><img src={fiftyYears} width="277" alt="FIFTY YEARS" /></h1>
      </header>
    );
  }
}

export default PageHeader;
