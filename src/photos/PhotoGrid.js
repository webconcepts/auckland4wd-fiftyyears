import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather';
import { fetchApi, onStatus, jsonOnStatus } from '../utils/api';

class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [
        // {id: '1', key: '1', src: '/demo-images/grid1.png'}, {id: '2', key: '2', src: '/demo-images/grid2.png'}, {id: '3', key: '3', src: '/demo-images/grid3.png'}, {id: '4', key: '4', src: '/demo-images/grid4.png'}, {id: '5', key: '5', src: '/demo-images/grid5.png'}, {id: '6', key: '6', src: '/demo-images/grid6.png'}, {id: '7', key: '7', src: '/demo-images/grid1.png'}, {id: '8', key: '8', src: '/demo-images/grid2.png'}, {id: '9', key: '9', src: '/demo-images/grid3.png'}, {id: '10', key: '10', src: '/demo-images/grid4.png'}, {id: '11', key: '11', src: '/demo-images/grid5.png'}, {id: '12', key: '12', src: '/demo-images/grid6.png'}, {id: '13', key: '13', src: '/demo-images/grid1.png'}, {id: '14', key: '14', src: '/demo-images/grid2.png'}, {id: '15', key: '15', src: '/demo-images/grid3.png'}, {id: '16', key: '16', src: '/demo-images/grid4.png'}, {id: '17', key: '17', src: '/demo-images/grid5.png'}, {id: '18', key: '18', src: '/demo-images/grid6.png'}
      ],
      draggedItem: null
    };

    this.fileInput = React.createRef();

    // this.handleDrag = this.handleDrag.bind(this);
    // this.handleDragOver = this.handleDragOver.bind(this);
    // this.handleDrop = this.handleDrop.bind(this);

    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    fetchApi('GET', 'drafts/photo-albums/' + this.props.albumId + '/photos')
      .then((response) => jsonOnStatus(response, 200))
      .then((json) => {
        const photos = json.data.map((photo, i) => {
          return {key: i, ...photo};
        });
        this.setState({ images: photos });
      })
      .catch(() => this.setState({ apiError: true }));
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
      type: file.type,
      number: key
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

    return (
      <div>
        <ul className="list-reset grid gap-2px template-cols-auto-258px">
          {images.map((image, i) => 
            <li 
              className="block" 
              key={image.key} 
              draggable 
              onDrag={(event) => this.handleDrag(event, i)} 
              onDrop={(event) => this.handleDrop(event, i)} 
              onDragOver={(event) => this.handleDragOver(event)}
            >
              <PhotoGridItem 
                imageSrc={image.src} 
                onLoad={(image) => this.handleImageLoad(image)} 
                uploading={image.uploaded == false} 
                history={this.props.history} 
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
  return (
    <div className="relative w-full h-0 pb-full">
      <Link 
        to={{ pathname: "/photo/1", state: { returnBackTo: props.history.length } }} 
        className="absolute flex w-full h-full overflow-hidden"
      >
        <img 
          src={props.imageSrc} 
          onLoad={props.onLoad} 
          className={`object-cover w-full hover:shadow-inner ${props.uploading ? 'opacity-40' : ''}`} 
        />
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