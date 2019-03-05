import React from 'react';
import { Route, Link } from 'react-router-dom';
import { fetchApi, onStatus, handleJsonByStatus } from '../utils/api';

import PhotoAlbumTips from './PhotoAlbumTips';
import ContentPageHeader from '../common/ContentPageHeader';
import ContentPageFooter from '../common/ContentPageFooter';
import PhotoGrid from './PhotoGrid';
import PhotoView from './PhotoView';
import Editable from '../forms/Editable';
import DraftMetaListItem from '../common/DraftMetaListItem';
import DraftMetaListDateItem from '../common/DraftMetaListDateItem';
import PageSpinner from '../common/PageSpinner';
import { Camera, MapPin, Calendar } from 'react-feather';

class PhotoAlbum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      album: {
        title: null,
        date: null,
        approx_day: null,
        approx_month: null,
        approx_year: null,
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
    fetchApi('GET', 'drafts/photo-albums/' + this.props.match.params.id)
      .then((response) => handleJsonByStatus(response, {
        200: (json) => this.setState({ album: json.data, loading: false })
        // 404: redirect to page not found        
      }))
      .catch(() => this.setState({ apiError: true }));    
  }

  handleChange(event, field) {
    let album = this.state.album;
    album[field] = event.target.value;

    this.setState({
      album: album
    });   
  }

  handleSave() {
    fetchApi('PATCH', 'drafts/photo-albums/' + this.props.match.params.id, this.state.album)
      .then((response) => onStatus(response, 200))
      .catch(() => this.setState({ apiError: true }));
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
              <DraftMetaListDateItem 
                name="date" 
                day={this.state.album.approx_day} 
                month={this.state.album.approx_month} 
                year={this.state.album.approx_year} 
                onChangeDay={(event) => this.handleChange(event, 'approx_day')} 
                onChangeMonth={(event) => this.handleChange(event, 'approx_month')} 
                onChangeYear={(event) => this.handleChange(event, 'approx_year')} 
                onEditingDone={this.handleSave} 
                color="buttercup" 
                label="Date" 
                iconComponent={Calendar} 
              />
              <DraftMetaListItem 
                name="location" 
                value={this.state.album.location} 
                onChange={(event) => this.handleChange(event, 'location')} 
                onEditingDone={this.handleSave} 
                color="monza" 
                label="Location" 
                iconComponent={MapPin} 
              />
              <DraftMetaListItem 
                name="photographer" 
                value={this.state.album.photographer} 
                onChange={(event) => this.handleChange(event, 'photographer')} 
                onEditingDone={this.handleSave} 
                color="havelock" 
                label="Photographer" 
                iconComponent={Camera} 
              />
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

export default PhotoAlbum;
