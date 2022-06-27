

import { createStackNavigator } from '@react-navigation/stack';
import LandingPageScreens from "../screens/LandingPageScreens";
import LoginCustomerScreen from "../screens/LoginCustomerScreen";
import LoginWorkshopScreen from "../screens/LoginWorkshopScreen";
import RegisterCustomerScreen from "../screens/RegisterCustomerScreen";
import RegisterWorkshopScreen from "../screens/RegisterWorkshopScreen";
import MapScreenCustomer from '../screens/MapScreenCustomer';
import TabNavigator from './TabNavigator';
import TabNavigatorWorkshop from './TabNavigatorWorkshop';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useCallback } from "react";
import { useNavigation } from '@react-navigation/native';
import BengkelDetail from '../screens/BengkelDetail';
import MapScreenWorkshop from '../screens/MapScreenWorkshop';
import ChatScreen from '../screens/ChatScreen';
import ChatList from '../screens/ChatList';
import LiveLocation from '../screens/LiveLocation';
import ListOrder from '../screens/ListOrderScreens';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import BarcodeScreen from '../screens/BarcodeScreen';
import PaymentScreen from '../screens/PaymentScreen';
import { useFocusEffect } from "@react-navigation/native";
import TopUpScreen from '../screens/TopUpScreen';
import PaymentTopUpScreen from '../screens/PaymentTopUpScreen';
const Stack = createStackNavigator();

export default function StackNavigator() {
  const navigation = useNavigation()

  const [user, setUser] = useState(null);
  const [workshop, setWorkshop] = useState(null);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("@customer").then(res => { setUser(res) })
      AsyncStorage.getItem("@workshop").then(res => { setWorkshop(res) })
    }, [])
  );
  
  
  useFocusEffect(
    useCallback(() => {
      if (user) {
        navigation.navigate("HomeScreenCustomer");
      } else if (workshop) {
        navigation.navigate("HomeScreenWorkshop");
      } else if (!workshop || !user) {
        navigation.navigate("LoginCustomer");
      }
    }, [user, workshop])
    );

  return (
      <Stack.Navigator >
        {/* <Stack.Screen name="LandingPageScreens" component={LandingPageScreens} /> */}

        <Stack.Screen options={{ headerShown: false }} name="LoginCustomer" component={LoginCustomerScreen} />
        <Stack.Screen options={{ headerShown: false }} name="HomeScreenCustomer" component={TabNavigator} />


        <Stack.Screen options={{ headerShown: false }} name="LoginWorkshop" component={LoginWorkshopScreen} />
        <Stack.Screen options={{ headerShown: false }} name="HomeScreenWorkshop" component={TabNavigatorWorkshop} />

        <Stack.Screen options={{ headerShown: false }} name="RegisterCustomer" component={RegisterCustomerScreen} />
        <Stack.Screen options={{ headerShown: false }} name="RegisterWorkshop" component={RegisterWorkshopScreen} />

        <Stack.Screen options={{ headerShown: false }} name="MapScreenCustomer" component={MapScreenCustomer} />
        <Stack.Screen options={{ headerShown: false }} name="MapScreenWorkshop" component={MapScreenWorkshop} />
        <Stack.Screen name="BengkelDetail" component={BengkelDetail} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ChatList" component={ChatList} />
        <Stack.Screen name="LiveLocation" component={LiveLocation} />
        <Stack.Screen name="BarcodeScreen" component={BarcodeScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ListOrder" component={ListOrder} /> 
        <Stack.Screen options={{ headerShown: false }} name="OrderDetail" component={OrderDetailScreen} />
        <Stack.Screen options={{headerShown: false}} name="TopUpScreen" component={TopUpScreen} />
        <Stack.Screen name="PaymentTopUpScreen" component={PaymentTopUpScreen} />
      </Stack.Navigator>
  )
}