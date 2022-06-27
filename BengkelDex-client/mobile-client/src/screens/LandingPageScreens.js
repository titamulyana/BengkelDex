import { Text, Button, View } from "native-base"
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import LoadingAll from "../components/LoadingAll";
// import { useIsFocused } from "@react-navigation/native";
export default function LandingPageScreens({ navigation }) {
  const [user, setUser] = useState(null);
  const [workshop, setWorkshop] = useState(null);

  const navigateToLoginCustomer = () => {
    navigation.navigate("LoginCustomer");
  }

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("@customer").then(res => { setUser(res) })
      AsyncStorage.getItem("@workshop").then(res => { setWorkshop(res) })
    }, [])
  );
  
  
  useFocusEffect(
    useCallback(() => {
      if (user) {
        navigation.replace("HomeScreenCustomer");
      } else if (workshop) {
        navigation.replace("HomeScreenWorkshop");
      } 
    }, [user, workshop])
    );
    
    // else if (!workshop || !user) {
    //   navigation.replace("LoginCustomer");
    // }

  return (

    <>
      <LoadingAll></LoadingAll>
    </>

  )
}