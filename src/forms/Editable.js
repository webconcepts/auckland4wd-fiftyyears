import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { Check, Edit2 } from 'react-feather';

class Editable extends Component {
  constructor(props) {
    super(props);   

    this.state = {
      // value: props.value ? props.value : '',
      editing: false
    };

    this.contentEditable = React.createRef();

    // this.handleChange = this.handleChange.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // handleChange(event) {
  //   this.setState({
  //     value: event.target.value
  //   });
  // }

  handleKeyPress(event) {
    if (event.key === 'Enter' && !this.props.multiline) {
      this.toggleEditing();
    }
  }

  toggleEditing() {
    const editing = !this.state.editing;

    this.setState({
      editing: editing
    });

    if (!editing && this.props.onEditingDone) {
      this.props.onEditingDone();
    }
  }

  componentDidUpdate() {
    if (this.state.editing) {
      this.contentEditable.current.focus();
    }
  }

  renderButton() {
    const color = this.props.color ? this.props.color : 'havelock';
    const editButtonColor = this.props.buttonColor ? this.props.buttonColor : 'grey';    
    const paddingLeft = this.props.multiline ? '' : 'pl-2 ';

    const classes = `hover:text-${color} focus:text-${color} focus:outline-none`;

    if (this.state.editing) {
      return (
        <button onClick={this.toggleEditing} title="Done" className={`text-white ${classes} ${paddingLeft}`}>
          { /* @todo replace svg to avoid using transfrom to align icon to baseline of text */ }
          <Check size="23" transform="translate(0,5)" className="leading-0" /> { this.props.multiline && 'save' }
        </button>);
    } else if (this.props.value) {
      return (
        <button onClick={this.toggleEditing} title="Edit" className={`text-${editButtonColor} ${classes} ${paddingLeft}`}>
          <Edit2 size="17" transform="translate(0,2)" /> { this.props.multiline && 'edit' }
        </button>);
    } else {
      return (
        <button onClick={this.toggleEditing} className={`${this.props.className} text-grey ${classes}`}>
          add {this.props.name}
        </button>);
    }
  }

  render() {
    const tagName = this.props.tagName ? this.props.tagName : 'div';

    return (
      <div>
        <ContentEditable 
          innerRef={this.contentEditable}
          html={this.props.value ? this.props.value : ''}
          disabled={!this.state.editing}
          onChange={this.props.onChange}
          onKeyPress={this.handleKeyPress}
          tagName={tagName} 
          className={`focus:outline-none ${this.props.className} ${this.state.editing && 'min-w-1 text-dust bg-tint-white'}`} />
        {this.renderButton()}
      </div>        
    );
  } 
}

export default Editable;