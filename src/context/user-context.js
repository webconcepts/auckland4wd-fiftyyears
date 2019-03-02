import React from 'react';

export default React.createContext({
  id: null,
  email: null,
  access_expires: null,
  logInUser: (user) => {}
});