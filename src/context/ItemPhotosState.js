import React from 'react';
import { fetchApi, jsonOnStatus, onStatus } from '../utils/api';

import ItemPhotosContext from './item-photos-context';

class ItemPhotosState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      isLoading: true,
      isError: true,
    };

    this.handleGet = this.handleGet.bind(this);
    this.handleGetSrc = this.handleGetSrc.bind(this);
    this.handleReorder = this.handleReorder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    fetchApi('GET', 'drafts/photo-albums/' + this.props.id + '/photos')
      .then((response) => jsonOnStatus(response, 200))
      .then((json) => {
        const photos = json.data.map((photo, i) => {
          return {key: i, ...photo};
        });
        this.setState({ photos: photos, isLoading: false });
      })
      .catch(() => this.setState({ isError: true, isLoading: false }));
  }

  handleGet(id) {
    if (this.state.isLoading) {
      return {};
    }

    const index = this.state.photos.findIndex(photo => photo.id == id);

    return {
      photo: this.state.photos[index],
      next: (index + 1 < this.state.photos.length) ? this.state.photos[index + 1] : null,
      previous: (index > 0) ? this.state.photos[index - 1] : null,
    };
  }

  handleGetSrc(key, width, height, crop = '') {
    const photo = this.state.photos.find(photo => photo.key == key);

    if (photo.src && !photo.uploaded) {
      return photo.src;
    }

    const resize = `${width}x${height}${crop}`;
    const filePath = `${process.env.REACT_APP_S3_KEY_PREFIX}/${this.props.id}/${photo.id}`;

    return `${process.env.REACT_APP_S3_URL}${resize}/${filePath}`;
  }

  handleChange(key, data) {
    const i = this.state.photos.findIndex(photo => photo.key == key);
    const photos = [...this.state.photos];
    photos[i] = Object.assign(photos[i], data);

    this.setState({ photos });
  }

  handleReorder(index, insertBefore) {
    this.handleSave(this.state.photos[index].key, { number: this.state.photos[insertBefore].number });

    // reorder state array and increment larger numbers
    const photos = this.reorderArray(this.state.photos, index, insertBefore).map((photo, i) => {
      photo.number = (i > insertBefore) ? photo.number + 1 : photo.number;
      return photo;
    });

    this.setState({ photos });
  }

  handleSave(key, extraData = {}) {
    const state = this.state.photos.find(photo => photo.key == key);
    const { description, number, uploaded } = { ...state, ...extraData };
    const data = { description, number, uploaded };

    fetchApi('PATCH', 'drafts/photo-albums/' + this.props.id + '/photos/' + state.id, data)
      .then(response => jsonOnStatus(response, 200))
      .then(json => this.handleChange(key, json.data))
      .catch(error => { return console.log(error); });
  }

  handleRemove(key) {
    const state = this.state.photos.find(photo => photo.key == key);

    fetchApi('DELETE', 'drafts/photo-albums/' + this.props.id + '/photos/' + state.id)
      .then(response => onStatus(response, 200))
      .then(() => {
        const photos = this.state.photos.filter(photo => photo.key != key);
        this.setState({ photos: photos });
      })
      .catch(error => { return console.log(error); });
  }

  handleAdd(files) {
    let photos = this.state.photos;
    let toUpload = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        // only accept jpeg image files
        if (!files[i].type.startsWith('image/jp')) {
          return;
        }

        toUpload.push({
          key: photos.length + 1,
          file: files[i]
        });
        photos.push({
          'key': photos.length + 1,
          'id': null,
          'src': window.URL.createObjectURL(files[i]),
          'uploaded': false,
        });
      }

      this.setState({ photos });
      this.uploadPhotos(toUpload);
    }
  }

  uploadPhotos(photos) {
    const { key, file } = photos.shift();

    // create the first photo
    fetchApi('POST', 'drafts/photo-albums/' + this.props.id + '/photos', {
      filename: file.name,
      type: file.type
    })
      .then(response => jsonOnStatus(response, 201))
      .then(json => {
        this.handleChange(key, json.data);
        if (photos.length) {
          this.uploadPhotos(photos); // create next photo
        }

        // upload file to S3, and then update db record
        fetch(json.upload.url, { method: 'POST', body: this.buildS3UploadBody(json.upload.data, file) })
          .then((response) => onStatus(response, 201))
          .then(() => this.handleSave(key, { uploaded: true }))
          .catch((error) => console.log(error));
      })
      .catch();
  }

  buildS3UploadBody(data, file) {
    const body = new FormData();
    Object.keys(data).map((k) => body.append(k, data[k]));
    body.append('file', file);
    return body;
  }

  reorderArray(array, oldPosition, newPosition) {
    array.splice(newPosition, 0, array.splice(oldPosition, 1)[0]);
    return array;
  }

  render() {
    return (
      <ItemPhotosContext.Provider
        value={{
          photos: this.state.photos,
          isLoading: this.state.isLoading,
          isError: this.state.isError,
          get: this.handleGet,
          getSrc: this.handleGetSrc,
          add: this.handleAdd,
          change: this.handleChange,
          reorder: this.handleReorder,
          save: this.handleSave,
          remove: this.handleRemove
        }}
      >
        {this.props.children}
      </ItemPhotosContext.Provider>
    );
  }
}

export default ItemPhotosState;
