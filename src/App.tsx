/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import ListRecords from './list-records';
import store from './reducers';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <ListRecords />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
