import { Box, Text, VStack, Image, Center, Button, HStack, Switch } from "native-base";
import logo from "../images/BengkelDex.png";
import { mainColor, secondaryColor } from "../constant/color";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { URL } from "../constant/listurl";
export default function HomeScreenWorkshop() {
  const navigation = useNavigation()
  const [isEnabled, setIsEnabled] = useState(false);
  const [workshop, setWorkshop] = useState({});
  const [tokenWorkshop, setTokenWorkshop] = useState({});
  const [statusWorkshop, setStatusWorkshop] = useState({});

  const toggleSwitch = () => setIsEnabled(previousState => {
    return !previousState
  });

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  }
  
  const statusOpen = async () => {
    try {
      toggleSwitch()
      const url = URL + `/workshops/${workshop.id}`
      const { data: status } = await axios({
        method: "PATCH",
        url: url,
        headers: {
          token: tokenWorkshop
        },
        data: {
          statusOpen: isEnabled
        }
      })
      setStatusWorkshop(isEnabled)
    } catch (err) {
      console.log(err);
    }
  }
  const navigateToMap = () => {
    navigation.navigate("MapScreenWorkshop")
  }

  useEffect(() => {
    const workshopStorage = getData("workshop").then(res => {
      setWorkshop(res.payload)
      setTokenWorkshop(res.token)
      setStatusWorkshop(res.payload.statusOpen)
    })
  }, [isEnabled])

  return (
    <>
      <SafeAreaView>
        <VStack space={5}>
          <Box mt={5} backgroundColor={mainColor}>
            <HStack justifyContent={"space-between"}  >
              <VStack ml={3} >
                <Text fontWeight={"bold"} >Haii {workshop.name}</Text>
                <Text fontWeight={"bold"} >Your Balance : {workshop.balance} DexCoin</Text>
              </VStack>
            </HStack>
          </Box>
          <Center>
            <Image size={100} source={logo} alt={"logo"} />
          </Center>
          <Box>
            <Text fontSize={'2xl'} fontWeight={"bold"} textAlign={'center'} >
              {workshop.name}
            </Text>
            <Text fontSize={'2xl'} fontWeight={"bold"} textAlign={'center'}>
              your vehicle workshop
            </Text>
          </Box>
          <Center>
            <Text color={'coolGray.400'} textAlign="center" maxWidth={250}>
              Your address : {workshop.address}
            </Text>
          </Center>
          <Center>
            {statusWorkshop ? <Button rounded={"3xl"} backgroundColor={mainColor} w="2/3" onPress={statusOpen} >
              Your workshop is OPEN, Click to CLOSE
            </Button> : <Button rounded={"3xl"} backgroundColor={"coolGray.400"} w="2/3" onPress={statusOpen} >
              <Text>Your workshop is CLOSE, Click to OPEN</Text>
            </Button>}
          </Center>
          <Center>
            <Text fontSize={'2xl'} fontWeight={"bold"}>OR</Text>
          </Center>
          <Center>
            <Button onPress={navigateToMap} rounded={"3xl"} w="2/3" backgroundColor={secondaryColor}>
              <Text>Check customer near you !</Text>
            </Button>
          </Center>
        </VStack>
      </SafeAreaView>
    </>
  );
}