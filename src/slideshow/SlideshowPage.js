import React from 'react';
import { Route, Link } from 'react-router-dom';

import Slideshow from './Slideshow';
import Button from '../common/Button';
import { Play } from 'react-feather';

class SlideshowPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRandom: true,
      photosPerAlbum: 7,
      photoDisplayTime: 7
    };
  }

  render() {
    const inputClasses = 'text-white bg-blackish-light py-2 px-3 border-transparent border-b-2 focus:outline-none focus:border-grey';

    return (
      <React.Fragment>
        <Route path={`${this.props.match.path}/play`} render={() => (
          <Slideshow
            isRandom={this.state.isRandom}
            photosPerAlbum={this.state.photosPerAlbum}
            photoDisplayTime={this.state.photoDisplayTime}
          />
        )} />
        <div className="max-w-sm mx-auto pt-16">
          <p className="mb-6">
            <label>
              <span className="block mb-3">Length of time to display each photo for (in seconds)</span>
              <input
                type="number"
                name="photoDisplayTime"
                value={this.state.photoDisplayTime}
                onChange={(e) => this.setState({ photoDisplayTime: e.target.value })}
                className={inputClasses}
              />
            </label>
          </p>
          <p className="mb-6">
            <label>
              <span className="block mb-3">Number of photos to include from each album</span>
              <input
                type="number"
                name="photosPerAlbum"
                value={this.state.photosPerAlbum}
                onChange={(e) => this.setState({ photosPerAlbum: e.target.value })}
                className={inputClasses}
              />
            </label>
          </p>
          <p className="mb-10">
            <input
              type="checkbox"
              name="isRandom"
              checked={this.state.isRandom}
              onChange={() => this.setState({ isRandom: !this.state.isRandom })}
            />
            <span className="ml-4">Randomise order of albums</span>
          </p>
          <Button to={`${this.props.match.path}/play`} component={Link} iconComponent={Play} label="Play slideshow" iconColor="buttercup" hoverColor="buttercup" className="no-underline" />
        </div>
      </React.Fragment>
    );
  }
}

export default SlideshowPage;
