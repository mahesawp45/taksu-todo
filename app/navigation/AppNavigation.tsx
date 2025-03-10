import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from 'app/auth/LoginScreen';
import HomeScreen from 'app/home/HomeScreen';

import { RootStackParamList } from './routes/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen options={{ headerShown: false }} name="Login">
        {(props) => <LoginScreen />}
      </Stack.Screen>

      <Stack.Screen options={{ headerShown: false }} name="Home">
        {(props) => <HomeScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigation;
