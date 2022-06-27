import { Button, HStack, Text, VStack, Box, Divider, Center, View } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../constant/listurl";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import LoadingAll from "../components/LoadingAll";
import priceToRupiah from "../helpers/priceToRupiah";
import { Dimensions } from "react-native";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function OrderDetailScreen({ route }) {
  const navigation = useNavigation();

  const [order, setOrder] = useState({});
  // const [token, setToken] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const workshopStorage = await AsyncStorage.getItem("@workshop");
        // setToken(JSON.parse(workshopStorage).token);
        const { data: response } = await axios({
          method: "GET",
          url: URL + `/orders/${route.params.id}`,
          headers: {
            access_token: JSON.parse(workshopStorage).token,
          },
        });
        console.log(response);
        setOrder(response);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const getBarcode = async () => {
    try {
      navigation.navigate("BarcodeScreen", { data: order.id });
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <LoadingAll></LoadingAll>;
  }
  console.log(order);
  return (
    <SafeAreaView>
      <VStack space="0" divider={<Divider />}>
        <Box px="4" pt="4" mb="0" pb="4" backgroundColor={"blue.200"}>
          <Text bold="200" fontSize={30}>Order ID: {order.id}</Text>
        </Box>
        <Box  px="4" pt="4" mb="0" pb="4">
          <Text bold="100" fontSize={30}>Details</Text>
          <Text bold="100" fontSize={22}>Order Created: {order.createdAt.slice(0,10)}</Text>
          <Text bold="100" fontSize={22}>Services:</Text>
          {order.OrderDetails.map((el) => {
            return (
              <HStack key={el.id} justifyContent={"space-between"}>
                <Text fontSize={18}>{el.Service.name}</Text>
                <Text fontSize={16}>
                  {priceToRupiah(el.Service.price)}
                </Text>
              </HStack>
            );
          })}
        </Box>
        <Box px="4" pb="4">
          <HStack justifyContent={"space-between"} pt="3">
            <Text fontSize={18} bold="200">Total Price</Text>
            <Text fontSize={18} bold="300">{priceToRupiah(order.totalPrice)}</Text>
          </HStack>
        </Box>
        <Center pt={3}>
        {
        !order.paymentStatus ?
        <Button onPress={getBarcode} backgroundColor={"blue.800"} w={200}>Generate Barcode</Button> :
        <Button disabled backgroundColor={"green.400"} w={200}>Order has been Paid</Button>
      }
        </Center>
      </VStack>
    </SafeAreaView>
   
  );
}