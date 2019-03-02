import React from 'react';
import { Route, Link } from 'react-router-dom';
import { apiGet, apiPatch } from '../utils/api';

import PhotoAlbumTips from './PhotoAlbumTips';
import ContentPageHeader from '../common/ContentPageHeader';
import ContentPageFooter from '../common/ContentPageFooter';
import PhotoGrid from './PhotoGrid';
import PhotoView from './PhotoView';
import Editable from '../forms/Editable';
import PageSpinner from '../common/PageSpinner';
import { Camera, MapPin, Calendar, ArrowLeft } from 'react-feather';

class PhotoAlbum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      album: {
        title: null,
        date: null,
        location: null,
        photographer: null,
        description: null
      },
      loading: true,
      apiError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    apiGet('drafts/photo-albums/' + this.props.match.params.id, {
      200: (json) => this.setState({ album: json.data, loading: false }),
      // 404: redirect to page not found
      error: () => this.setState({ apiError: true })
    });
  }

  handleChange(event, field) {
    let album = this.state.album;
    album[field] = event.target.value;

    this.setState({
      album: album
    });
   
  }

  handleSave() {
    apiPatch('drafts/photo-albums/' + this.props.match.params.id, this.state.album,
      {
        error: () => this.setState({ apiError: true })
      }
    );
  }

  render() {
    return (
      <div className="font-sans">
        { this.state.loading && 
          <PageSpinner />
        }

        <PhotoAlbumTips />

        <ContentPageHeader 
          value={this.state.album.title} 
          onChange={(event) => this.handleChange(event, 'title')} 
          onEditingDone={this.handleSave} 
          img={'/demo-images/header.png'} 
        />

        <main>
          <div className="max-w-lg xl:max-w-xl mx-auto px-6 md:px-10 py-8">
            <ul className="list-reset">
              <MetaListItem name="date" value="" color="buttercup" label="Date" iconComponent={Calendar} />
              <MetaListItem name="location" value={this.state.album.location} onChange={(event) => this.handleChange(event, 'location')} onEditingDone={this.handleSave} color="monza" label="Location" iconComponent={MapPin} />
              <MetaListItem name="photographer" value={this.state.album.photographer} onChange={(event) => this.handleChange(event, 'photographer')} onEditingDone={this.handleSave} color="havelock" label="Photographer" iconComponent={Camera} />
            </ul>

            <div className="py-8">
              <Editable name="description" value={this.state.album.description} onChange={(event) => this.handleChange(event, 'description')} onEditingDone={this.handleSave} multiline className="typography leading-normal font-light" />
            </div>

          </div>
        </main>
        
        <PhotoGrid history={this.props.history} albumId={this.props.match.params.id} />
        
        <ContentPageFooter linkBackTo="/" />

      </div>
    );
  }
}

const MetaListItem = (props) => {
  const IconComponent = props.iconComponent;

  return (
    <li className="flex md:inline-flex items-center pr-10" aria-label={props.label}>
      <div className={`py-2 pr-4 leading-none text-${props.color}`}>
        <IconComponent size="22" />
      </div>                
      <Editable name={props.name} value={props.value} onChange={props.onChange} onEditingDone={props.onEditingDone} color={props.color} className="inline-block py-2" />           
    </li>
  );
};

export default PhotoAlbum;
