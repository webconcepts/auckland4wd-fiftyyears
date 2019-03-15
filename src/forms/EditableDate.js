import React from 'react';

import Select from './Select';
import ButtonForEditable from './ButtonForEditable';

class EditableDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };

    this.days = Array.from({length: 31}, (x,i) => i + 1);
    this.years = Array.from({length: 51}, (x,i) => i + 1969);
    this.shortMonthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.dayInput = React.createRef();

    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  toggleEditing() {
    const editing = !this.state.editing;

    this.setState({ editing: editing });

    if (!editing && this.props.onEditingDone) {
      this.props.onEditingDone();
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.toggleEditing();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing && !prevState.editing) {
      this.dayInput.current.focus();
    }
  }

  hasValue() {
    return this.props.day || this.props.month || this.props.year;
  }

  render() {
    return (
      <div>
        {this.state.editing && (
          <React.Fragment>
            <Select
              ref={this.dayInput}
              value={this.props.day}
              options={this.days}
              onChange={this.props.onChangeDay}
              onKeyPress={this.handleKeyPress}
            />
            <span className="text-dust mx-1">/</span>
            <Select
              value={this.props.month}
              options={this.shortMonthNames}
              useOptionIndexAsValue={true}
              onChange={this.props.onChangeMonth}
              onKeyPress={this.handleKeyPress}
            />
            <span className="text-dust mx-1">/</span>
            <Select
              value={this.props.year}
              options={this.years}
              onChange={this.props.onChangeYear}
              onKeyPress={this.handleKeyPress}
            />
          </React.Fragment>
        )}
        {!this.state.editing && this.hasValue() && (
          <div className={this.props.className}>
            {this.props.day && <span>{this.props.day} </span>}
            {this.props.month && <span>{this.monthNames[this.props.month]} </span>}
            {this.props.year && <span>{this.props.year}</span>}
          </div>
        )}
        <ButtonForEditable
          label={this.props.name}
          onClick={this.toggleEditing}
          editing={this.state.editing}
          hasValue={this.hasValue()}
          color={this.props.color}
          className={this.props.className}
        />
      </div>
    );
  }
}

export default EditableDate;
