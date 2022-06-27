import {
  Button,
  Text,
  Center,
  Modal,
  VStack,
  HStack,
  Radio,
  Image,
  FormControl,
  Input,
  Toast,
  Box,
  Spinner,
  Heading,
  Icon,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { URL } from "../constant/listurl";
import { MaterialIcons, Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import axios from "axios";
import priceToRupiah from "../helpers/priceToRupiah";

export default function ProfileWorkshop() {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const [workshop, setWorkshop] = useState({});
  const [token, setToken] = useState({});
  const [loadingModal, setLoadingModal] = useState(false);
  const [input, setInput] = useState({
    name: "",
    price: "",
  });
  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      // console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@workshop");
      await AsyncStorage.removeItem("@token");
      console.log("logout");
      navigation.replace("LoginCustomer");
    } catch (e) {
      console.log(e);
    }
  };

  const navigateToListOrder = () => {
    // console.log(token);
    navigation.navigate("ListOrder", { id: workshop.id, token: token, payload: workshop });
  };

  const addService = async (data) => {
    try {
      const { data: response } = await axios({
        method: "POST",
        url: URL + `/workshops/services/${workshop.id}`,
        data: data,
      });
      console.log(response);
      Toast.show({
        render: () => {
          return (
            <Center>
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                Success add services
              </Box>
            </Center>
          );
        },
      });
      setLoadingModal(false);
      setShowModal(false);
    } catch (err) {
      setLoadingModal(false);
      Toast.show({
        render: () => {
          return (
            <Center>
              <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                Failed! Service has not been added
              </Box>
            </Center>
          );
        },
      });
      console.log(err);
    }
  };

  useEffect(() => {
    const workshopStorage = getData("workshop").then((res) => {
      // console.log(res);
      setWorkshop(res.payload);
      setToken(res.token);
    });
  }, []);

  if (loadingModal) {
    return (
      <VStack space={2} mt={windowHeight * 0.5} justifyContent="center">
        <Spinner size={windowWidth * 0.2} accessibilityLabel="Loading posts" />
        <Center>
          <Text color={"darkBlue.500"} fontSize={"2xl"}>
            Loading...
          </Text>
        </Center>
      </VStack>
    );
  }

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
            <Center>
              <Image
                size={100}
                mt={windowHeight * -0.06}
                borderRadius={"full"}
                borderWidth={"2"}
                borderColor={"coolGray.400"}
                source={{ uri: workshop.imgUrl }}
                alt={"Logo"}
              />
            </Center>
            <Center>
              <Text fontSize={"2xl"} fontWeight={"bold"} h={windowHeight * 0.1}>
                {workshop.name}
              </Text>
            </Center>
            <Center>
              <HStack space={2}>
                <Center>
                  <Icon as={MaterialIcons} name="mail" size={5} color="black" />
                </Center>
                <Text fontSize={"sm"} fontWeight={"normal"}>
                  {workshop.email}
                </Text>
                <Center>
                  <Icon as={FontAwesome5} name="coins" size={5} />
                </Center>
                <Text fontSize={"sm"} fontWeight={"normal"} isTruncated maxW={windowWidth * 0.24}>
                  {priceToRupiah(workshop.balance)}
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
                  maxW={windowWidth * 0.67}
                  color={"coolGray.500"}
                >
                  {workshop.address}
                </Text>
              </HStack>
            </Center>
            <Center h={windowHeight * 0.1}>
              <HStack space={4}>
                <Button w={windowWidth * 0.2} rounded="xl" onPress={navigateToListOrder}>
                  <Center>
                    <Icon as={Ionicons} name="ios-list-outline" color="white" />
                  </Center>
                  Order
                </Button>
                <Button w={windowWidth * 0.2} rounded="xl" onPress={() => setShowModal(true)}>
                  <Center>
                    <Icon as={Ionicons} name="md-add" color="white" />
                  </Center>
                  Service
                </Button>
                <Button w={windowWidth * 0.2} rounded="xl" onPress={logout}>
                  <Center>
                    <Icon as={Entypo} name="log-out" color="white" />
                  </Center>
                  Log Out
                </Button>
              </HStack>
            </Center>
          </Box>
        </Center>
        <Box></Box>
      </VStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add Service</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Service Name</FormControl.Label>
              <Input onChangeText={(name) => setInput({ ...input, name })} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Price: eg. 25000</FormControl.Label>
              <Input onChangeText={(price) => setInput({ ...input, price })} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowModal(false);
              }}>
                Cancel
              </Button>
              <Button onPress={() => {
                addService(input)
                setLoadingModal(true)
              }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
}
