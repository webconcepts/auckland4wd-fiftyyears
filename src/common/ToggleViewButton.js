import React from 'react';
import Button from './Button';

class ToggleViewButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: props.hideByDefault ? props.hideByDefault : false,
      disabled: false
    };
  }

  handleToggle() {
    if (this.state.disabled) {
      return;
    }

    this.setState({
      hidden: !this.state.hidden,
      disabled: this.props.onlyOnce ? true : this.state.disabled
    });
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => this.handleToggle()}
          disabled={this.state.disabled}
          disabledColor={this.props.iconColor}
          {...this.props}
        />
        <div hidden={this.state.hidden}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ToggleViewButton;
