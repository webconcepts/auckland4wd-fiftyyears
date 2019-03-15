import React from 'react';

import PhotoGridItem from './PhotoGridItem';
import PhotoGridAddItem from './PhotoGridAddItem';
import ItemPhotosContext from '../context/item-photos-context';
import Spinner from '../common/Spinner';

class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      draggedIndex: null
    };

    this.fileInput = React.createRef();
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleDrag(e, index) {
    e.preventDefault();
    this.setState({ draggedIndex: index });
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDrop(e, insertBeforeIndex) {
    e.preventDefault();
    this.context.reorder(this.state.draggedIndex, insertBeforeIndex);
  }

  handleUpload() {
    const fileInput = this.fileInput.current;
    this.context.upload(fileInput.files);
  }

  render() {
    if (this.context.isLoading) {
      return <Spinner size="45" delay="1" />;
    }

    return (
      <ul className="list-reset grid gap-2px template-3cols-or-more">
        {this.context.photos.map((photo, i) =>
          <li
            className="block"
            key={photo.key}
            draggable={photo.uploaded}
            onDrag={(event) => this.handleDrag(event, i)}
            onDragOver={(event) => this.handleDragOver(event)}
            onDrop={(event) => this.handleDrop(event, i)}
          >
            <PhotoGridItem
              src={this.context.getSrc(photo.key, 380, 380)}
              uploading={photo.uploaded == false}
              linkTo={`${this.props.match.url}/photo/${photo.id}`}
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
    );
  }
}

PhotoGrid.contextType = ItemPhotosContext;

export default PhotoGrid;
