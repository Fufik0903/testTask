/**
 * @format
 */

import { AppRegistry } from 'react-native';
import ReduxApp from './redux/reduxApp';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => ReduxApp);
