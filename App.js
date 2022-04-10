import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/screens/Home';
import MyChart from './components/screens/MyChart';
import ProductInfo from './components/screens/ProductInfo';

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={
          {
            headerShown: false
          }
        }
        initialRouteName='Home'
      >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='My chart' component={MyChart} />
        <Stack.Screen name='ProductInfo' component={ProductInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}