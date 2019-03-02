import React from 'react';

import Button from '../common/Button';
import { ChevronUp, ChevronDown } from 'react-feather';

class PhotoAlbumTips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closed: localStorage.getItem('photo-album-tips-open') == 'true'
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const closed = !this.state.closed;
    localStorage.setItem('photo-album-tips-open', closed);
    this.setState({ closed: closed });
  }

  render() {
    const h3Classes = 'text-16 text-buttercup font-semibold mb-2';
    const linkClasses = 'text-havelock hover:text-blackish focus:text-blackish';

    return (
      <section className="relative bg-white text-blackish">
        <div className="max-w-lg xl:max-w-xl mx-auto px-6 md:px-10 py-8" hidden={this.state.closed}>
          <h2 className="font-light leading-tight mb-6 xxl:absolute xxl:pin-l xxl:pl-10 xxl:text-29 xxl:w-56">
            Tips for creating a photo album
          </h2>
          <div className="typography text-15 leading-normal">
            <h3 className={h3Classes}>Upload good quality images</h3>
            <p>
              Smaller images will be generated from the photos you upload, in sizes suitable to display on this website. The better the quality of the original photo, the better results, although bigger files will take longer to upload.
            </p>
            <h3 className={h3Classes}>Only upload .jpg images</h3>
            <p>
              Only .jpg (jpeg) images are supported. If you need help converting your images from another format, <a href="https://www.google.com/search?q=convert+images+to+jpeg" className={linkClasses}>ask google first</a>.
            </p>
            <h3 className={h3Classes}>Please add a date</h3>
            <p>
              We need a date so we can place your album on a timeline. You can leave the day blank, but please add a month and year. If you don't know exactly, make it your best guess.
            </p>
            <h3 className={h3Classes}>Description, location, photographer are optional</h3>
            <p>Feel free to leave these blank if they're not needed for your album. Any blank fields will not be shown on the published album.</p>
            <p><strong className={`${h3Classes} inline-block`}>Are you a little stuck?</strong> &ndash; ask for help, <a href="mailto:jeremy@auckland4wd.org.nz" className={linkClasses} title="Email for help">jeremy@auckland4wd.org.nz</a></p>
          </div>
        </div>
        <div className={`absolute pin-r ${this.state.closed ? 'pin-t' : 'pin-b'}`}>
          {!this.state.closed && (
            <Button 
              iconComponent={ChevronUp} 
              label="Ok, got it" 
              textColor="blackish" 
              color="monza" 
              onClick={this.toggle}
              className="py-1 pr-6 md:pr-10" 
            />            
          )}
          {this.state.closed && (
            <Button 
              iconComponent={ChevronDown} 
              label="tips" 
              color="grey" 
              textColor="grey"
              onClick={this.toggle}
              className="py-2 pr-6 md:pr-10" 
            />            
          )}
        </div>
      </section>
    );
  }
}

export default PhotoAlbumTips;