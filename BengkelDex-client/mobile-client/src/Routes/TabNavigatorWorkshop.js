import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenWorkshop from "../screens/HomeScreenWorkshop";
import MapScreenWorkshop from "../screens/MapScreenWorkshop";
import ProfileWorkshop from "../screens/ProfileWorkshop";
import ChatList from "../screens/ChatList";
import AddOrderScreens from "../screens/AddOrderScreens";
import {
  Ionicons,
  Fontisto,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function TabNavigatorWorkshop() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons
                name={focused ? "ios-home" : "ios-home-outline"}
                size={24}
                color={color}
                style={[]}
              />
            );
          },
          tabBarActiveTintColor: "#1866E1",
        }}
        name="Home"
        component={HomeScreenWorkshop}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
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
        component={MapScreenWorkshop}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons
                name={focused ? "ios-add-circle" : "ios-add-circle-outline"}
                size={40}
                color={color}
              />
            );
          },
          tabBarLabel: () => {return null}      
        }}
        name="AddOrder"
        component={AddOrderScreens}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons
                name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
                size={24}
                color={color}
              />
            );
          },
        }}
        name="Inbox"
        component={ChatList}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons
                name={focused ? "person-circle" : "person-circle-outline"}
                size={24}
                color={color}
              />
            );
          },
        }}
        name="My Workshop"
        component={ProfileWorkshop}
      />
    </Tab.Navigator>
  );
}
