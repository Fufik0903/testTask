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

export interface workType {
  name: string;
}
function App() {
  const dispatch = useAppDispatch();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const { list, isLoading } = useSelector((state: RootState) => state.list);
  const permissionResult = async () => {
    const coords: Coordinates = await checkPermission();
    dispatch(allData(coords));
  };
  useEffect(() => {
    permissionResult();
  }, []);
  useEffect(() => {
    if (Platform.OS === 'android') {
      setStatusBarHeight(StatusBar.currentHeight || 0);
    }
  }, []);
  return (
    <SafeAreaProvider>
      <View style={[{ paddingTop: statusBarHeight, flex: 1 }]}>
        {isLoading ? (
          <View>
            <Text>Loading</Text>
          </View>
        ) : (
          <FlatList
            data={list}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.listContainer}>
                <View style={styles.listTitle}>
                  <Text style={styles.title}>{item.companyName}</Text>
                  <Image
                    source={{ uri: `${item.logo}` }}
                    width={80}
                    height={80}
                  />
                </View>
                {item.workTypes?.map((wType: workType) => (
                  <View>
                    <Text style={styles.desc}>{wType.name}</Text>
                  </View>
                ))}
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  desc: {
    fontSize: 18,
  },
  listContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;
