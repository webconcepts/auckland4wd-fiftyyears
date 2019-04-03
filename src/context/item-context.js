import React from 'react';

export default React.createContext({
  data: {},
  isLoading: true,
  isUpdating: false,
  isError: false,
  isRemoved: false,
  change: null,
  save: null,
  publish: null,
  unpublish: null,
  setCoverPhoto: null
});
