import React from 'react';
import { Redirect } from 'react-router-dom';
import { monthName } from './utils/date';

import ItemContext from './context/item-context';
import UserContext from './context/user-context';
import ContentPageHeader from './common/ContentPageHeader';
import ContentPageFooter from './common/ContentPageFooter';
import Editable from './forms/Editable';
import MetaListItem from './common/MetaListItem';
import DraftMetaListDateItem from './common/DraftMetaListDateItem';
import PageSpinner from './common/PageSpinner';
import { MapPin, Calendar } from 'react-feather';

class ContentPage extends React.Component {
  render() {
    const {
      authorshipLabel,
      authorshipIcon,
      children
    } = this.props;

    if (this.context.isLoading) {
      return <PageSpinner />;
    } else if (this.context.isRemoved) {
      return <Redirect to={`/draft/${this.context.data.type ? this.context.data.type : 'milestone'}/${this.context.data.id}`} />;
    }

    return (
      <React.Fragment>
        <ContentPageHeader value={this.context.data.title} />
        <main>
          <div className="max-w-lg xl:max-w-xl mx-auto px-6 md:px-10 py-8">
            <ul className="list-reset">
              {this.context.data.approx_year && (
                <MetaListItem label="Date" iconComponent={Calendar} color="buttercup">
                  {this.context.data.approx_year && <span>{monthName(this.context.data.approx_month)} </span>}
                  {this.context.data.approx_year && <span>{this.context.data.approx_year}</span>}
                </MetaListItem>
              )}
              {this.context.data.location && (
                <MetaListItem label="Location" iconComponent={MapPin} color="monza">
                  {this.context.data.location}
                </MetaListItem>
              )}
              {this.context.data.authorship && (
                <MetaListItem label={authorshipLabel} iconComponent={authorshipIcon} color="havelock">
                  {this.context.data.authorship}
                </MetaListItem>
              )}
              <UserContext.Consumer>
                {context => context.editor && (
                  <MetaListItem>
                    <button
                      onClick={this.context.unpublish}
                      className="relative uppercase text-grey-light text-14 bg-blackish-light py-2 px-4 hover:bg-monza hover:text-white"
                      style={{ top: '-5px' }}
                    >
                      Unpublish
                    </button>
                  </MetaListItem>
                )}
              </UserContext.Consumer>
            </ul>
            <div className="py-8">
              <div
                dangerouslySetInnerHTML={{__html: this.context.data.description}}
                className="typography leading-normal font-light text-15 md:text-16"
              />
            </div>
          </div>
          {children}
        </main>
        <ContentPageFooter linkBackTo="/" />
      </React.Fragment>
    );
  }
}

ContentPage.contextType = ItemContext;

export default ContentPage;
