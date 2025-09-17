/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { checkPermission, Coordinates } from './permission/permission';
import { RootState, useAppDispatch } from './redux/store';
import { allData } from './redux/listSlice';
import { useSelector } from 'react-redux';
import Routes from './routes/Routes';

function App() {
  const dispatch = useAppDispatch();
  const { list } = useSelector((state: RootState) => state.list);
  const permissionResult = async () => {
    const coords: Coordinates = await checkPermission();
    dispatch(allData(coords));
  };
  useEffect(() => {
    console.log;
    if (list.length === 0) permissionResult();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={[{ flex: 1 }]}>
        <Routes />
      </View>
    </SafeAreaProvider>
  );
}

export default App;
