import React from 'react';

class TextFormField extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      value: '' 
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {    
    this.setState({ 
      value: event.target.value 
    });
  }

  render() {
    return (
      <div className="my-6">
        <label>
          <div className="inline-block w-1/4 py-2 pr-6 text-right">
            {this.props.label}
          </div>
          <input 
            type="text" 
            ref={this.props.inputRef}
            name={this.props.name} 
            value={this.props.value ? this.props.value : this.state.value}
            onChange={this.props.onChange ? this.props.onChange : this.handleChange}
            className={`w-3/4 ${this.props.disabled ? 'text-grey' : 'text-white'} bg-blackish-light py-2 px-3 border-transparent border-b-2 focus:outline-none focus:border-grey`}
            autoComplete={this.props.autoComplete ? this.props.autoComplete : 'on'}
            disabled={this.props.disabled}
          />
        </label>
      </div>
    );
  }
}

export default TextFormField;