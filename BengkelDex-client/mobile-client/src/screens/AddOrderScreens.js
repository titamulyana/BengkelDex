import { VStack, ScrollView, Center, Box, CheckIcon, HStack, Image, Text, Input, Checkbox, Select, Button } from "native-base"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions } from "react-native"
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../constant/listurl";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import LoadingAll from "../components/LoadingAll";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import priceToRupiah from "../helpers/priceToRupiah";
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@workshop");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

export default function AddOrderScreens({ navigation }) {
  const isFocused = useIsFocused();
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [checkedState, setCheckedState] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const storage = await getData()
        // console.log(storage)
        const { data: response } = await axios({
          method: "GET",
          url: URL + `/workshops/services/${storage.payload.id}`,
        })
        setServices(response)
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    })()
  }, [isFocused])

  let checked = []

  const handleChange = async (id, e) => {
    try {
      // console.log(id, e, 'inputan');
      // console.log(checkedState, checked, 'SEBELUM')
      if (checkedState.length === 0) {
        checked.push(id)
        setCheckedState(checked)

        // console.log(checkedState, "PERTAMA");
      } else if (e === true) {
        checked.push(id)
        setCheckedState(checked)

        // console.log(checkedState, "midle");
      } else if (e === false) {
        checked = checked.filter(item => item !== id)
        setCheckedState(checked)
        // console.log(checkedState, "filter")
      }
      // console.log(checkedState, checked, 'SEBELUM DI SET');
      // console.log(checkedState, checked, 'AFTER SET');
      // console.log('==============================================');
    } catch (err) {
      console.log(err);
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const input = {
        services: checkedState,
      }
      // console.log(input, '33333333333333333');
      const storage = await getData()

      const { data: response } = await axios({
        method: "POST",
        url: URL + `/orders/${storage.payload.id}`,
        headers: {
          access_token: storage.token
        },
        data: input
      })
      Toast.show({
        render: () => {
          return (
            <Center>
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                Success create order !
              </Box>
            </Center>
          )
        }
      })
      navigation.navigate("Home")
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) {
    return <LoadingAll></LoadingAll>
  }
  return (

    <SafeAreaView>
      <Center>
        <Box
          shadow={"9"}
          rounded={"3xl"}
          mt={windowHeight * 0.15}
          backgroundColor={"blue.300"}
          width={windowWidth * 0.9}
          height={windowHeight * 0.6}
        >
          <VStack space={windowHeight * 0.02}>
            <Center>
              <Box backgroundColor={"darkBlue.400"} mt={windowHeight * -0.03} rounded={"2xl"} >
                <Text fontSize={"4xl"} textAlign={"center"} w={windowWidth * 0.7}>
                  Create Order
                </Text>
              </Box>
            </Center>
            <Center>
              <Text fontSize={"xl"}>
                Choose your services
              </Text>
            </Center>
            <Center>
              <ScrollView backgroundColor={"blue.400"} h={windowHeight * 0.4} w={windowWidth * 0.7} rounded={"2xl"} px={windowWidth * 0.04} py={windowHeight * 0.02}>
                <VStack space={4} mb={windowHeight * 0.04}>


                  {services.map((item, index) => {
                    return (
                      <Center key={index}>
                        <Box key={index} w={windowWidth * 0.5} h={windowHeight * 0.05} backgroundColor={"blue.100"} rounded={"2xl"} shadow={'9'}>
                          <HStack justifyContent={"space-between"}>
                            {/* <Text>{item.id}</Text> */}
                            <VStack ml={windowWidth * 0.05}>
                              <Text>{item.name}</Text>
                              <Text>{priceToRupiah(item.price)}</Text>
                            </VStack>
                            <Center mr={windowWidth * 0.03} >
                              <Checkbox accessibilityLabel="cek"
                                onChange={(e) => {
                                  handleChange(item.id, e)
                                }}
                                value={item.id} name="checked"></Checkbox>
                            </Center>
                          </HStack>
                        </Box>
                      </Center>
                    )
                  })}

                </VStack>
              </ScrollView>
            </Center>
            <Center>
              <Button
                rounded={"2xl"}
                backgroundColor={"darkBlue.500"}
                w={windowWidth * 0.7}
                onPress={handleSubmit}
                title="Submit"
              >Submit</Button>
            </Center>
          </VStack>
        </Box>
      </Center>

    </SafeAreaView>

  )
}