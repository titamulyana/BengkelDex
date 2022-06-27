import { Box, HStack, Center, VStack, Button, Text, Image } from "native-base"
import { mainColor } from "../constant/color";
import { Dimensions } from "react-native";
import priceToRupiah from "../helpers/priceToRupiah";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ListOrderCard(props) {
  const navigation = useNavigation()
  const { order } = props;
  console.log(order);
  function navigateOrderDetail() {
    navigation.navigate("OrderDetail", { id: order.id })
  }
  return (
    <Box rounded={"2xl"} w={windowWidth * 0.8} p={3} background={"blue.100"} shadow={"5"}>
      <HStack space={3} justifyContent={"space-between"}>
        <HStack space={3}>
          {/* <Center>
            <Image source={{ uri: order.User.imgUrl }} rounded={'full'} alt={"customerImg"} size={windowHeight * 7 / 100} />
          </Center> */}
          <VStack space={1}>
            <Text>{order.date}</Text>
            <Text>Total Price : {priceToRupiah(order.totalPrice)}</Text>
            {!order.paymentStatus ?
              <Text>Status payment: <Text color={"red.600"}>UnPaid</Text></Text> :
              <Text>Status payment: <Text color={"green.600"}>Paid</Text></Text>
            }
          </VStack>
        </HStack>
        <Center>
          <Button onPress={navigateOrderDetail} rounded={"2xl"} backgroundColor={mainColor}>Check</Button>
        </Center>
      </HStack>
    </Box>
  )
}