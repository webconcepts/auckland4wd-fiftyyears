import React from 'react';
import { Link } from 'react-router-dom';
import { fetchApi, onStatus, jsonOnStatus } from '../utils/api';

import Spinner from '../common/Spinner';
import { Plus } from 'react-feather';

class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      draggedItem: null,
      loading: true,
    };

    this.fileInput = React.createRef();

    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    fetchApi('GET', 'drafts/photo-albums/' + this.props.albumId + '/photos')
      .then((response) => jsonOnStatus(response, 200))
      .then((json) => {
        const photos = json.data.map((photo, i) => {
          return {key: i, ...photo};
        });
        this.setState({ images: photos, loading: false });
      })
      .catch(() => this.setState({ apiError: true, loading: false }));
  }

  handleDrag(event, file) {
    event.preventDefault();

    this.setState({
      draggedItem: file
    });
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDrop(event, fileToInsertBefore) {
    event.preventDefault();

    // send api request
    const photoToUpdate = this.state.images[this.state.draggedItem];
    photoToUpdate.number = this.state.images[fileToInsertBefore].number;
    this.updatePhoto(this.state.draggedItem, photoToUpdate.id, photoToUpdate);

    // reorder state array
    const images = this.reorderArray(this.state.images, this.state.draggedItem, fileToInsertBefore);

    this.setState({
      draggedItem: null,
      images: images
    });
  }

  handleUpload() {
    const fileInput = this.fileInput.current;
    let images = this.state.images;

    // get selected files
    if (fileInput.files) {
      for (let i = 0; i < fileInput.files.length; i++) {

        // only accept image files
        if (!fileInput.files[i].type.startsWith('image/')) {
          return;
        }

        // queue api requests, and get data to add to state
        images.push(this.addNewPhoto(images.length + 1, fileInput.files[i]));
      }

      this.setState({
        images: images
      });
    }
  }

  addNewPhoto(key, file) {
    // create new db record for photo
    fetchApi('POST', 'drafts/photo-albums/' + this.props.albumId + '/photos', {
      filename: file.name,
      type: file.type
    })
      .then(response => jsonOnStatus(response, 201))
      .then(json => {
        this.setImageState(key, json.data);

        // upload file to S3, and then update db record
        fetch(json.upload.url, { method: 'POST', body: this.buildS3UploadBody(json.upload.data, file) })
          .then((response) => onStatus(response, 201))
          .then(() => this.updatePhoto(key, json.data.id, { uploaded: true }))
          .catch((error) => console.log(error));
      })
      .catch();

    // return image data to add to state
    return {
      'key': key,
      'id': null,
      'src': window.URL.createObjectURL(file),
      'hasObjectURL': true,
      'uploaded': false,
      'tmpFile': file
    };
  }

  buildS3UploadBody(data, file) {
    const body = new FormData();
    Object.keys(data).map((k) => body.append(k, data[k]));
    body.append('file', file);
    return body;
  }

  updatePhoto(key, id, data) {
    fetchApi('PATCH', 'drafts/photo-albums/' + this.props.albumId + '/photos/' + id, data)
      .then(response => jsonOnStatus(response, 200))
      .then(json => this.setImageState(key, json.data))
      .catch(() => { return console.log('uh oh'); });
  }

  setImageState(key, data) {
    const i = this.state.images.findIndex(image => image.key == key);
    const images = [...this.state.images];
    images[i] = Object.assign(images[i], data);

    this.setState({images});
  }

  handleImageLoad(image) {
    if (image.hasObjectURL && image.src) {
      window.URL.revokeObjectURL(image.src);
    }
  }

  reorderArray(array, oldPosition, newPosition) {
    array.splice(newPosition, 0, array.splice(oldPosition, 1)[0]);
    return array;
  }

  render() {
    const images = this.state.images;

    if (this.state.loading) {
      return <Spinner size="45" delay="1" />;
    }

    return (
      <div>
        <ul className="list-reset grid gap-2px template-3cols-or-more">
          {images.map((image, i) =>
            <li
              className="block"
              key={image.key}
              draggable={image.uploaded}
              onDrag={(event) => this.handleDrag(event, i)}
              onDrop={(event) => this.handleDrop(event, i)}
              onDragOver={(event) => this.handleDragOver(event)}
            >
              <PhotoGridItem
                id={image.id}
                albumId={this.props.albumId}
                imageSrc={image.src}
                onLoad={(image) => this.handleImageLoad(image)}
                uploading={image.uploaded == false}
                history={this.props.history}
                linkTo={`${this.props.match.url}/photo/${image.id}`}
              />
            </li>
          )}
          <li className="block bg-blackish-light" key={'uploadbutton'}>
            <PhotoGridAddItem
              ref={this.fileInput}
              onChange={this.handleUpload}
            />
          </li>
        </ul>
      </div>
    );
  }
}

function PhotoGridItem(props) {
  const src = props.imageSrc ? props.imageSrc
    : `${process.env.REACT_APP_S3_URL}380x380/${process.env.REACT_APP_S3_KEY_PREFIX}/${props.albumId}/${props.id}`;

  return (
    <div className="relative w-full h-0 pb-full">
      <Link
        to={props.linkTo}
        className={`absolute flex w-full h-full overflow-hidden ${props.uploading ? 'pointer-events-none' : ''}`}
      >
        <img
          src={src}
          onLoad={props.onLoad}
          className={`object-cover w-full hover:shadow-inner ${props.uploading ? 'opacity-40' : ''}`}
        />
        {props.uploading && <Spinner className="absolute pin" size="45" />}
      </Link>
    </div>
  );
}

const PhotoGridAddItem = React.forwardRef((props, ref) => (
  <div className="relative w-full h-0 pb-full">
    <label
      title="Upload your photos to add them to this album"
      className="absolute flex items-center justify-center w-full h-full cursor-pointer hover:text-havelock focus:text-havelock"
    >
      <Plus /> add photos
      <input
        ref={ref}
        name="Photos[Upload]"
        className="hidden"
        type="file"
        multiple={true}
        accept="image/jpeg"
        onChange={props.onChange}
      />
    </label>
  </div>
));

export default PhotoGrid;
