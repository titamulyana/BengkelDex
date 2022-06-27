import { Text, Box, Center, VStack, Input, Link, Button, Icon } from "native-base";
import { mainColor } from "../constant/color";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { URL } from "../constant/listurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TopUpScreen() {
  const [input, setInput] = useState({
    inputAmount: 0,
  });
  const navigation = useNavigation();
  const topUp = async () => {
    try {
      const userData = await AsyncStorage.getItem("@customer");
      const token = JSON.parse(userData).token;
      const { data } = await axios({
        method: "post",
        url: URL + "/payment/top-up",
        headers: {
          access_token: token,
        },
        data: {
          amount: input.inputAmount,
        },
      });
      navigation.navigate("PaymentTopUpScreen", { data: data, amount: input.inputAmount });
      // console.log(data, "PPPPPPPPPPPPPPPPPP");
    } catch (error) {
      console.log(error, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    }
  };

  return (
    <SafeAreaView>
      <VStack h={windowHeight * 0.9} justifyContent={"space-between"}>
        <Box></Box>
        <Center>
          <Center>
            <Box
              shadow={"9"}
              backgroundColor={"blue.200"}
              width={windowWidth * 0.8}
              h={windowHeight * 0.28}
              rounded={"3xl"}
            >
              <Center>
                <Text fontSize={"2xl"} fontWeight={"normal"} mt={windowHeight * 0.025}>
                  Top up DexCoin
                </Text>
              </Center>
              <Center>
                <Icon as={FontAwesome5} name="coins" size={5} mt={windowHeight * 0.01} />
              </Center>
              <Center>
                <Input
                  placeholder="How much do you want to top up?"
                  mt={windowHeight * 0.02}
                  w={windowWidth * 0.6}
                  bgColor="white"
                  rounded={"lg"}
                  onChangeText={(inputAmount) => setInput({ ...input, inputAmount })}
                />
                <Button mt={windowHeight * 0.02} bgColor={mainColor} onPress={topUp}>
                  Top up!
                </Button>
              </Center>
            </Box>
          </Center>
        </Center>
        <Box></Box>
      </VStack>
    </SafeAreaView>
  );
}
