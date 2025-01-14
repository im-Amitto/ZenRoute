/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppRoutes} from './src/navigation/AppRoutes';
import {AuthenticationRoutes} from './src/navigation/AuthenticationRoutes';
import Loading from './src/components/Loading';
import useFirstLaunch from './src/hooks/useFirstLaunch';
import InitialStartScreen from './src/screens/Initial/Initial';
import Onboard from './src/screens/Onboard/Onboard';
import MainNavigator from './src/navigation/MainNavigator';
import Login from './src/screens/Login/Login';
import useAuthStore from './src/store/AuthStore';
import Signup from './src/screens/Signup/Signup';
import Login2 from './src/screens/Login/Login2';

const AppStack = createNativeStackNavigator<AppRoutes>();
const AuthenticationStack = createNativeStackNavigator<AuthenticationRoutes>();

function App(): JSX.Element {
  const isFirstLaunch = useFirstLaunch();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  console.log('IS LOGGED IN: ', isLoggedIn);
  if (isFirstLaunch === null || isLoggedIn === null) {
    return <Loading />;
  }

  const AuthenticationNavigator = () => {
    return (
      <AuthenticationStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={isFirstLaunch ? 'Initial' : 'Login'}>
        <AuthenticationStack.Screen
          name="Initial"
          component={InitialStartScreen}
        />
        <AuthenticationStack.Screen name="Onboard" component={Onboard} />
        <AuthenticationStack.Screen name="Login" component={Login} />
        <AuthenticationStack.Screen name="Login2" component={Login2} />
        <AuthenticationStack.Screen name="Signup" component={Signup} />
      </AuthenticationStack.Navigator>
    );
  };

  const INIT_ROUTE = isLoggedIn ? 'Main' : 'Authentication';
  console.log('INIT ROUTE: ', INIT_ROUTE);
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AppStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={INIT_ROUTE}>
          <AppStack.Screen
            name="Authentication"
            component={AuthenticationNavigator}
          />
          <AppStack.Screen name="Main" component={MainNavigator} />
        </AppStack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
