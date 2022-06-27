import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";

import { Button, Text, HStack, VStack, Center, Box, Image, Icon } from "native-base";
// import { Button, Text, View } from "react-native";

import LoadingAll from "../components/LoadingAll";

import { URL } from "../constant/listurl";
import { Dimensions } from "react-native";
import { mainColor } from "../constant/color";
import { AntDesign, Fontisto, FontAwesome5, FontAwesome } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PaymentScreen({ route }) {
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [token, setToken] = useState({});

  const navigation = useNavigation()
  useEffect(() => {
    (async () => {
      try {
        const userData = await AsyncStorage.getItem("@customer");
        let { data } = await axios({
          method: "get",
          url: URL + "/orders/" + route.params.data,
          headers: {
            access_token: JSON.parse(userData).token,
          },
        });
        setUser(JSON.parse(userData).payload);
        setToken(JSON.parse(userData).token);
        setOrderDetail(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (isLoading) {
    return <LoadingAll></LoadingAll>
  }

  const payNow = async () => {
    try {
      const payment = await axios({
        method: "post",
        url: `${URL}/payment/${orderDetail.id}?WorkshopId=${orderDetail.WorkshopId}&UserId=${user.id}`,
        headers: {
          access_token: token
        }
      })
      navigation.navigate("HomePage")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView>
 <VStack mt={windowHeight * 0.05} space={windowHeight * 0.03}>
      <Center>
        <Box
          backgroundColor={"blue.100"}
          w={windowWidth * 0.9}
          h={windowHeight * 0.2}
          rounded={"3xl"}
        >
          <VStack space={windowHeight * 0.02}>
            <Center>
              <Text fontSize={"2xl"} color={mainColor} fontWeight={"bold"}>Your Account</Text>
            </Center>
            <HStack space={windowWidth * 0.05}>
              <Center>
                <Image
                  source={{ uri: user.imgUrl }}
                  size={windowHeight * 0.10}
                  rounded={"lg"}
                  alt={"userImg"}
                  ml={windowWidth * 0.02}
                />
              </Center>
              <VStack>
                <Text
                  fontSize={"lg"}
                  color={"blue.500"}
                >{user.name}</Text>
                <Text
                  fontSize={"md"}
                  color={"coolGray.500"}
                >
                  {user.email}
                </Text>
                <Text
                  fontSize={"md"}
                  color={"coolGray.500"}
                >
                  {user.role}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </Center>
      <Center>
        <Box
          backgroundColor={"blue.100"}
          w={windowWidth * 0.9}
          h={windowHeight * 0.4}
          rounded={"3xl"}
        >
          <VStack
            space={windowHeight * 0.02}
          >
            <Center>
              <Text fontSize={"2xl"} color={mainColor} fontWeight={"bold"}>Order Detail</Text>
            </Center>
            <Center>
              <Box
                backgroundColor={"blue.200"}
                w={windowWidth * 0.8}
                h={windowHeight * 0.2}
                rounded={"3xl"}
              >
                {orderDetail.OrderDetails.map(el => {
                  return <Text >{el.Service.name}</Text>
                })}
              </Box>
            </Center>
          </VStack>

        </Box>
      </Center>


      <Center>
        <Button w={windowWidth * 0.4} h={windowHeight * 0.05} rounded={"3xl"}>
          <HStack space={windowWidth * 0.01}>
            <Icon as={FontAwesome} name={"send"} size={"4"} color={"blue.100"} />
            {/* <AntDesign name="home" size={24} color="black" /> */}
            <Text>PAY</Text>
          </HStack>
        </Button>
      </Center>

    </VStack >
    </SafeAreaView>
   
    // <View>
    //   <Text>{user.balance}</Text>
    //   <Text>{orderDetail.totalPrice}</Text>
    //   <Button
    //     title="Pay Now"
    //     color="#841584"
    //     accessibilityLabel="Learn more about this purple button"
    //     onPress={payNow}
    //   ></Button>
    // </View>
  );
}
