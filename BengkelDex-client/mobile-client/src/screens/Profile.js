import { Button, Text, Center, VStack, HStack, Image, Box, Icon } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import priceToRupiah from "../helpers/priceToRupiah";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Profile() {
  const navigation = useNavigation();
  const [customer, setCustomer] = useState({});

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@customer");
      await AsyncStorage.removeItem("@token");
      console.log("logout");
      navigation.replace("LoginCustomer");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const customerStorage = getData("customer").then((res) => {
      console.log(res);
      setCustomer(res.payload);
    });
  }, []);

  return (
    <SafeAreaView backgroundColor={"#c1c7c9"} height={windowHeight}>
      <VStack h={windowHeight * 0.9} justifyContent={"space-between"}>
        <Box></Box>
        <Center>
          <Box
            shadow={"9"}
            backgroundColor={"blue.200"}
            width={windowWidth * 0.8}
            h={windowHeight * 0.38}
            rounded={"3xl"}
          >
            <VStack>
              <Center>
                <Image
                  size={100}
                  mt={windowHeight * -0.06}
                  borderRadius={"full"}
                  borderWidth={"2"}
                  borderColor={"coolGray.400"}
                  source={{
                    uri: "https://media-exp2.licdn.com/dms/image/C5103AQFb3SSll63O9g/profile-displayphoto-shrink_800_800/0/1548945277576?e=1661385600&v=beta&t=nUHcnAezfb0SSst5nOlOrGR3HxjKVr35uezUz3j-8Ho",
                  }}
                  alt={"Logo"}
                />
              </Center>
              <Center>
                <Text fontSize={"2xl"} fontWeight={"bold"} h={windowHeight * 0.1}>
                  {customer.name}
                </Text>
              </Center>
              <Center>
                <HStack space={2}>
                  <Center>
                    <Icon as={MaterialIcons} name="mail" size={5} color="black" />
                  </Center>
                  <Text fontSize={"sm"} fontWeight={"normal"}>
                    {customer.email}
                  </Text>
                  <Center>
                    <Icon as={FontAwesome5} name="coins" size={5} />
                  </Center>
                  <Text fontSize={"sm"} fontWeight={"normal"} isTruncated maxW={windowWidth * 0.24}>
                    {priceToRupiah(customer.balance)}
                  </Text>
                </HStack>
              </Center>
              <Center h={windowHeight * 0.075}>
                <HStack space={2}>
                  <Center>
                    <Icon as={Ionicons} name="home" size={5} color="black" />
                  </Center>
                  <Text
                    fontSize={"xs"}
                    fontWeight={"normal"}
                    isTruncated
                    maxW={windowWidth * 0.5}
                    color={"coolGray.500"}
                  >
                    {customer.address}
                  </Text>
                </HStack>
              </Center>
              <Center h={windowHeight * 0.13}>
                <HStack space={6}>
                  <Button
                    w={windowWidth * 0.3}
                    rounded="xl"
                    onPress={() => {
                      navigation.navigate("TopUpScreen");
                    }}
                  >
                    TOP UP
                  </Button>
                  <Button onPress={logout} w={windowWidth * 0.3} rounded="xl">
                    LOG OUT
                  </Button>
                </HStack>
              </Center>
            </VStack>
          </Box>
        </Center>
        <Box></Box>
      </VStack>
    </SafeAreaView>
  );
}
