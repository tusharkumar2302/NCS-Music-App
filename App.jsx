import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {useSetupPlayer} from './src/hooks/useSetupTrackPlayer';
import useLikeSongs from './src/store/likeStore';
import {darkTheme} from './src/theme/darkTheme';

const App = () => {
  const {loadLikeSongs} = useLikeSongs();
  // track player setup
  const onLoad = () => {
    // console.log('track player setup...');
    loadLikeSongs();
  };
  useSetupPlayer({onLoad});
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer theme={darkTheme}>
        <DrawerNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
