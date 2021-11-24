/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Theme from '_assets/Theme';
import Navigator from '_navigations';

const App = () => {
  return (
    <PaperProvider theme={Theme}>
      <Navigator />
    </PaperProvider>
);
}

export default App;
