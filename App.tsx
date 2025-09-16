/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import { useEffect, useState } from 'react';
import {
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
import { FlatList } from 'react-native/types_generated/index';

function App() {
  const [data, setData] = useState([]);
  const permissionResult = async () => {
    const { latitude, longitude }: Coordinates = await checkPermission();
    const res = await axios.get(
      `https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude=${latitude}&longitude=${longitude}`,
    );
    setData(res.data);
    console.log('RESULT 5', res);
  };
  useEffect(() => {
    permissionResult();
  }, []);
  return (
    <SafeAreaProvider>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={{ padding: 20, borderBottomWidth: 1, borderColor: '#ccc' }}
          >
            <Text>{item.companyName}</Text>
          </View>
        )}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
