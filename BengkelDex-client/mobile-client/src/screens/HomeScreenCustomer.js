import {
  Box,
  Text,
  VStack,
  Image,
  Center,
  ScrollView,
  HStack,
  Switch,
} from "native-base";
import logo from "../images/BengkelDex.png";
import { mainColor, secondaryColor } from "../constant/color";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { URL } from "../constant/listurl";
import * as Location from "expo-location";
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import priceToRupiah from "../helpers/priceToRupiah";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomeScreenCustomer() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [customer, setCustomer] = useState({});
  const [token, setToken] = useState({});

  const toggleSwitch = () =>
    setIsEnabled((previousState) => {
      return !previousState;
    });

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  // location masih hardcode
  const statusBroadcast = async () => {
    try {
      const url = URL + "/customers/broadcast";
      const { data: status } = await axios({
        method: "PATCH",
        url: url,
        headers: {
          access_token: token,
        },
        data: {
          status: isEnabled,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
      // console.log(status);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const customerStorage = getData("customer").then((res) => {
      setCustomer(res.payload);
      setToken(res.token);
    });
    statusBroadcast();
  }, [isEnabled]);

  const navigateToMap = () => {
    navigation.navigate("MapScreenCustomer");
  };

  console.log(customer);
  return (
    <SafeAreaView style={styles.container}>
      <VStack>
        <Center>
          <Box mt={5}>
            <HStack>
              <Image
                size={70}
                borderRadius={"full"}
                source={{ uri: customer.imgUrl }}
                alt={"Logo"}
              />
              <VStack pl={4}>
                <Text
                  fontSize={24}
                  fontWeight={500}
                  paddingTop={0}
                  marginTop={0}
                >
                  Hello, {customer.name}
                </Text>
                <Text fontWeight={400} color={"gray.400"}>
                  How can we be of service?
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Center>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MapScreenCustomer")
          }}
          activeOpacity={0.8}
        >
          <ImageBackground
            source={require("../assets/images/home-stack1.jpeg")}
            height={windowHeight * 0.2}
            style={{ marginTop: 30, elevation: 5 }}
            imageStyle={{
              borderRadius: 20,
            }}
          >
            <Box
              h={windowHeight * 0.2}
              p={5}
              justifyContent={"flex-end"}
              backgroundColor="rgba(0, 0, 0, 0)"
              borderRadius="20"
              shadow="5"
            >
              <Text ml="2" color={"white"} fontWeight={"bold"} fontSize={20}>
                Contact a specialist near you
              </Text>
            </Box>
          </ImageBackground>
        </TouchableOpacity>

        <ImageBackground
          source={require("../assets/images/home-stack2.jpeg")}
          height={windowHeight * 0.2}
          style={{ marginTop: 10, elevation: 5 }}
          imageStyle={{
            borderRadius: 20,
          }}
        >
          <Box
            h={windowHeight * 0.2}
            p={5}
            justifyContent={"flex-end"}
            alignItems={"flex-start"}
            backgroundColor="rgba(0, 0, 0, 0)"
            borderRadius="20"
            shadow="5"
          >
            <Switch
              ml="5"
              size="30"
              onValueChange={toggleSwitch}
              value={isEnabled}
              onTrackColor="green.600"
            />
            <Text ml="2" color={"white"} fontWeight={"bold"} fontSize={20}>
              Contact nearby specialists
            </Text>
          </Box>
        </ImageBackground>
        <Text fontWeight={500} mt={5} fontSize={35}>
          Balance:
        </Text>
        <Text fontWeight={400} mt={0} fontSize={25}>
          {priceToRupiah(customer.balance)}
        </Text>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingHorizontal: 30,
    backgroundColor: "#eaeaea",
  },
});
