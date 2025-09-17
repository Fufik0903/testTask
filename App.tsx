/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { checkPermission } from './permission/permission';
import { RootState, useAppDispatch } from './redux/store';
import { allData } from './redux/listSlice';
import { useSelector } from 'react-redux';
import Routes from './routes/Routes';
import { Coordinates } from './interfaces';

function App() {
  const dispatch = useAppDispatch();
  const { list } = useSelector((state: RootState) => state.list) ?? [];
  const permissionResult = async () => {
    const coords: Coordinates = await checkPermission();
    dispatch(allData(coords));
  };
  useEffect(() => {
    if (list.length === 0) permissionResult();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Routes />
      </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});
export default App;
