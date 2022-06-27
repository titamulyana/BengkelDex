import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenCustomer from "../screens/HomeScreenCustomer";
import MapScreenCustomer from "../screens/MapScreenCustomer";
import ChatList from "../screens/ChatList";
import Profile from "../screens/Profile";
import PayOnline from "../screens/PayOnline";
import {
  Ionicons
} from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => {
            return <Ionicons name={focused ? "ios-home" : "ios-home-outline"} size={24} color={color} style={[]}/>;
          },
          tabBarActiveTintColor: "#1866E1"
        }}
        name="Home"
        component={HomeScreenCustomer}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => {
            return (
              <Ionicons
                name={focused ? "ios-map" : "ios-map-outline"}
                size={24}
                color={color}
              />
            );
          },
        }}
        name="Map"
        component={MapScreenCustomer}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => {
            return (
              <Ionicons name={focused ? "cash" : "cash-outline"} size={24} color={color} />
            );
          },
        }}
        name="Oneline Payment"
        component={PayOnline}
      />
      <Tab.Screen
        options={{ headerShown: false, tabBarIcon: ({color, focused}) => {
          return  <Ionicons name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"} size={24} color={color} />
        } }}
        name="Inbox"
        component={ChatList}
      />
      <Tab.Screen
        options={{ headerShown: false, tabBarIcon: ({color, focused}) => {
          return  <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={24} color={color} />
        } }}
        name="My Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

const lists = StyleSheet.create({
  tintColor: {
    flex: 1,
    backgroundColor: '#61dafb',
  },
  listItem: {
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
});
