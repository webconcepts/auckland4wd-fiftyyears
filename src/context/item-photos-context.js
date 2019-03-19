import React from 'react';

export default React.createContext({
  photos: {},
  isLoading: true,
  isError: false,
  get: null,
  getSrc: null,
  upload: null,
  change: null,
  reorder: null,
  save: null,
  remove: null
});
