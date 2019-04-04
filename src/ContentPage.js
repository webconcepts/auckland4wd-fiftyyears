import React from 'react';
import { Redirect } from 'react-router-dom';
import { monthName } from './utils/date';

import ItemContext from './context/item-context';
import UserContext from './context/user-context';
import ContentPageHeader from './common/ContentPageHeader';
import ContentPageFooter from './common/ContentPageFooter';
import MetaListItem from './common/MetaListItem';
import PublishButton from './common/PublishButton';
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
          <div className="max-w-lg xl:max-w-xl mx-auto p-6 md:px-10 md:py-8">
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
                    <PublishButton onClick={this.context.unpublish} label="Unpublish" />
                  </MetaListItem>
                )}
              </UserContext.Consumer>
            </ul>
            {(this.context.data.description) && (
              <div
                dangerouslySetInnerHTML={{__html: this.context.data.description}}
                className="typography py-8 leading-normal font-light text-15 md:text-16"
              />
            )}
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
