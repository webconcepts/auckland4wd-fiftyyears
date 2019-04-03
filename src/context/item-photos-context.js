import React from 'react';

export default React.createContext({
  photos: {},
  isLoading: true,
  isError: false,
  get: null,
  getSrc: null,
  add: null,
  change: null,
  reorder: null,
  save: null,
  like: null,
  remove: null
});
