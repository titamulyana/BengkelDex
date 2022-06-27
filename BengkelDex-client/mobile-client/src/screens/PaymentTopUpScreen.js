// import * as React from "react";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function PaymentTopUpScreen({ route }) {
  const { params } = route;
  const link = params.data.redirect_url;
  const amount = +params.amount;
  const navigation = useNavigation();
  const handleRouteStateChange = async (newNavState) => {
    try {
      const { url } = newNavState;
      let userData = await AsyncStorage.getItem("@customer");
      userData = JSON.parse(userData);
      if (url.includes("capture")) {
        userData.payload.balance += amount;
        await AsyncStorage.setItem(`@customer`, JSON.stringify(userData));
        navigation.replace("HomeScreenCustomer");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <WebView source={{ uri: `${link}` }} onNavigationStateChange={handleRouteStateChange} />
    </>
  );
}
