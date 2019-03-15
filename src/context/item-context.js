import React from 'react';

export default React.createContext({
  data: {},
  isLoading: true,
  isUpdating: false,
  isError: false,
  change: null,
  save: null
});
