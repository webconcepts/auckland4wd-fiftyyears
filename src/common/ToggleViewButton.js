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
    const { children, hideByDefault, onlyOnce, ...otherProps } = this.props;

    return (
      <div>
        <Button
          onClick={() => this.handleToggle()}
          disabled={this.state.disabled}
          disabledColor={this.props.iconColor}
          {...otherProps}
        />
        <div hidden={this.state.hidden}>
          {children}
        </div>
      </div>
    );
  }
}

export default ToggleViewButton;
