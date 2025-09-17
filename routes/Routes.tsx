import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './../components/List';
import ListItem from './../components/ListItem';
const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={List}
          options={{ title: 'Список' }}
        />
        <Stack.Screen
          name="Detail"
          component={ListItem}
          options={{ title: 'Описание' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
