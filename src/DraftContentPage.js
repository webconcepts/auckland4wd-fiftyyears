import React from 'react';
import { Redirect } from 'react-router-dom';

import ItemContext from './context/item-context';
import UserContext from './context/user-context';
import ContentPageHeader from './common/ContentPageHeader';
import ContentPageFooter from './common/ContentPageFooter';
import Editable from './forms/Editable';
import MetaListItem from './common/MetaListItem';
import DraftMetaListItem from './common/DraftMetaListItem';
import DraftMetaListDateItem from './common/DraftMetaListDateItem';
import PageSpinner from './common/PageSpinner';
import { MapPin, Calendar } from 'react-feather';

class DraftContentPage extends React.Component {
  render() {
    const {
      TipsComponent,
      authorshipLabel,
      authorshipIcon,
      children,
      includeLocation = true,
      includeAuthorship = true
    } = this.props;

    if (this.context.isLoading) {
      return <PageSpinner />;
    } else if (this.context.isRemoved) {
      return <Redirect to="/contribute" />;
    }

    return (
      <React.Fragment>
        <TipsComponent />
        <ContentPageHeader
          value={this.context.data.title}
          editable={true}
          onChange={(e) => this.context.change('title', e.target.value)}
          onEditingDone={this.context.save}
        />
        <main>
          <div className="max-w-lg xl:max-w-xl mx-auto px-6 md:px-10 py-8">
            <ul className="list-reset">
              <DraftMetaListDateItem
                day={this.context.data.approx_day}
                month={this.context.data.approx_month}
                year={this.context.data.approx_year}
                onChangeDay={(e) => this.context.change('approx_day', e.target.value)}
                onChangeMonth={(e) => this.context.change('approx_month', e.target.value)}
                onChangeYear={(e) => this.context.change('approx_year', e.target.value)}
                onEditingDone={this.context.save}
                color="buttercup"
                label="Date"
                iconComponent={Calendar}
              />
              {includeLocation && (
                <DraftMetaListItem
                  value={this.context.data.location}
                  onChange={(e) => this.context.change('location', e.target.value)}
                  onEditingDone={this.context.save}
                  color="monza"
                  label="Location"
                  iconComponent={MapPin}
                />
              )}
              {includeAuthorship && (
                <DraftMetaListItem
                  value={this.context.data.authorship}
                  onChange={(e) => this.context.change('authorship', e.target.value)}
                  onEditingDone={this.context.save}
                  color="havelock"
                  label={authorshipLabel}
                  iconComponent={authorshipIcon}
                />
              )}
              <UserContext.Consumer>
                {context => context.editor && (
                  <MetaListItem>
                    <button
                      onClick={this.context.publish}
                      className="relative uppercase text-grey-light text-14 bg-blackish-light py-2 px-4 hover:bg-monza hover:text-white"
                      style={{ top: '-5px' }}
                    >
                      Publish
                    </button>
                  </MetaListItem>
                )}
              </UserContext.Consumer>
            </ul>
            <div className="py-8">
              <Editable
                name="description"
                value={this.context.data.description}
                onChange={(e) => this.context.change('description', e.target.value)}
                onEditingDone={this.context.save}
                multiline
                className="typography leading-normal font-light text-15 md:text-16"
              />
            </div>
          </div>
          {children}
        </main>
        <ContentPageFooter linkBackTo="/contribute" />
      </React.Fragment>
    );
  }
}

DraftContentPage.contextType = ItemContext;

export default DraftContentPage;
