import React from 'react';

import Button from './Button';
import { ChevronUp, ChevronDown } from 'react-feather';

class TipsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closed: localStorage.getItem(props.cacheKey) == 'true'
    };
  }

  toggle() {
    const closed = !this.state.closed;
    localStorage.setItem(this.props.cacheKey, closed);
    this.setState({ closed: closed });
  }

  render() {
    return (
      <section key={this.props.cacheKey} className="relative bg-white text-blackish">
        <div className="max-w-lg xl:max-w-xl mx-auto px-6 md:px-10 pt-8 pb-4" hidden={this.state.closed}>
          <h2 className="font-light leading-tight mb-6 xxl:absolute xxl:pin-l xxl:pl-10 xxl:text-29 xxl:w-56">
            {this.props.title}
          </h2>
          <div className="typography text-15 leading-normal">
            {this.props.children}
          </div>
          {!this.state.closed && (
            <div className="xl:absolute xl:pin-r xl:pin-b">
              <Button
                iconComponent={ChevronUp}
                label="Ok, got it"
                iconColor="havelock"
                textColor="blackish"
                hoverColor="havelock"
                onClick={() => this.toggle()}
                className="xl:pb-3 xl:pr-10"
              />
            </div>
          )}
        </div>
        {this.state.closed && (
          <div className="absolute pin-r pin-t">
            <Button
              iconComponent={ChevronDown}
              label="help"
              textColor="grey"
              hoverColor="havelock"
              onClick={() => this.toggle()}
              className="py-2 pr-6 text-15 md:text-16 md:pr-10"
            />
          </div>
        )}
      </section>
    );
  }
}

export default TipsSection;
