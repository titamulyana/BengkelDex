import "./ignoreWarnings.js";
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import StackNavigator from './src/Routes/StackNavigator'
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </>
  );
}