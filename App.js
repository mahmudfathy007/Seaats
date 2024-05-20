import React from 'react';
import { SafeAreaView } from 'react-native';
import MapWithDirections from './MapWithDirections';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapWithDirections />
    </SafeAreaView>
  );
};

export default App;
