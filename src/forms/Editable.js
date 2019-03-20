import React from 'react';

import ContentEditable from 'react-contenteditable';
import ButtonForEditable from './ButtonForEditable';

class Editable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.contentEditable = React.createRef();

    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  toggleEditing() {
    const editing = !this.state.editing;

    this.setState({ editing: editing });

    if (!editing && this.props.onEditingDone) {
      this.props.onEditingDone();
    }
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
    case 13: // enter
      if (!this.props.multiline) {
        e.stopPropagation();
        this.toggleEditing();
      }
      break;
    case 27: // esc
      e.stopPropagation();
      this.toggleEditing();
      break;
    case 37: // left arrow
    case 39: // right arrow
      e.stopPropagation();
      break;
    }
  }

  componentDidUpdate() {
    if (this.state.editing) {
      this.contentEditable.current.focus();
    }
  }

  render() {
    return (
      <div>
        <ContentEditable
          innerRef={this.contentEditable}
          html={this.props.value ? this.props.value : ''}
          disabled={!this.state.editing}
          onChange={this.props.onChange}
          onKeyDown={this.handleKeyDown}
          tagName={this.props.tagName ? this.props.tagName : 'div'}
          className={`focus:outline-none ${this.props.className} ${this.state.editing && 'min-w-1 text-dust bg-tint-white'}`}
        />
        <ButtonForEditable
          label={this.props.name}
          onClick={this.toggleEditing}
          editing={this.state.editing}
          hasValue={(this.props.value)}
          multiline={this.props.multiline}
          color={this.props.color}
          className={this.props.className}
        />
      </div>
    );
  }
}

export default Editable;
