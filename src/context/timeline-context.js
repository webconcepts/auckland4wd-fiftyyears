import React from 'react';

export default React.createContext({
  data: {},
  lastUpdated: null,
  isLoading: true,
  isError: false,
  update: null
});
