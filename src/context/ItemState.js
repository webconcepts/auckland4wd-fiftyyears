import React from 'react';
import { fetchApi, jsonOnStatus, handleJsonByStatus } from '../utils/api';

import ItemContext from './item-context';

class ItemState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: true,
      isUpdating: false,
      isError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    fetchApi('GET', `drafts/${this.props.apiPath}/${this.props.id}`)
      .then((response) => handleJsonByStatus(response, {
        200: (json) => this.setState({ data: json.data, isLoading: false })
        // 404: redirect to page not found
      }))
      .catch(() => this.setState({ isError: true, isLoading: false }));
  }

  handleChange(field, value) {
    let data = this.state.data;
    data[field] = value;

    this.setState({
      data: data
    });
  }

  handleSave() {
    this.setState({ isUpdating: true });

    fetchApi('PATCH', `drafts/${this.props.apiPath}/${this.props.id}`, this.state.data)
      .then((response) => jsonOnStatus(response, 200))
      .then((json) => this.setState({ data: json.data, isUpdating: false }))
      .catch(() => this.setState({ isError: true, isUpdating: false }));
  }

  render() {
    return (
      <ItemContext.Provider
        value={{
          data: this.state.data,
          isLoading: this.state.isLoading,
          isUpdating: this.state.isUpdating,
          isError: this.state.isError,
          change: this.handleChange,
          save: this.handleSave
        }}
      >
        {this.props.children}
      </ItemContext.Provider>
    );
  }
}

export default ItemState;
