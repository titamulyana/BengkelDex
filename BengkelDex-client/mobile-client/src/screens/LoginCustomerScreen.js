import { Center, Text, VStack, Box, Input, Button, Link, Image, Flex, CloseIcon, Alert, Toast } from "native-base"
import { StyleSheet } from "react-native"
import { mainColor } from "../constant/color"
import logo from "../images/BengkelDex.png"
import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { URL } from "../constant/listurl"
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoginScreen({ navigation }) {

  const [input, setInput] = useState({
    email: "",
    password: "",
  })

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(`@${key}`, jsonValue)
    } catch (e) {
      // saving error
    }
  }
  
  const loginCustomer = async () => {
    try {
      const url = URL + '/customers/login'
      const { data: customer } = await axios.post(url, input)
      await storeData('customer', customer)
      Toast.show({
        render: () => {
          return (
            <Center>
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                Login Success !
              </Box>
            </Center>
          )
        }
      })
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreenCustomer' }],
      })
    } catch (err) {
      Toast.show({
        render: () => {
          return (
            <Center>
              <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                Invalid Username or Password !
              </Box>
            </Center>
          )
        }
      })
      console.log(err);

    }
  }

  const navigateToLoginWorkshop = () => {
    navigation.navigate("LoginWorkshop")
  }

  const navigateToRegisterCustomer = () => {
    navigation.navigate("RegisterCustomer")
  }

  return (
    <>
      <VStack
        space={5}
        mt={20}
      >
        <Center>
          <Image size={100} source={logo} alt={"Logo"} >
          </Image>
        </Center>
        <Center>
          <Box>
            <Text fontSize={'2xl'} fontWeight="extrabold" >Login</Text>
          </Box>
        </Center>
        <Center>
          <VStack space={'2'} width="4/5">
            <Input placeholder="Email"
              onChangeText={(email) => setInput({ ...input, email })}
            />
            <Input placeholder="Password" type="password"
            marginTop={windowHeight * 0.01}
              onChangeText={(password) => setInput({ ...input, password })}
            />
            <Button 
            marginTop={windowHeight * 0.03}
            bgColor={mainColor} onPress={loginCustomer}
             >Continue</Button>
            <Center
            marginTop={windowHeight * 0.01}
            >
              <Flex direction="row"
              >
                <Text
                  textAlign={"center"}
                >Or Login as a Workshop Owner </Text>
                <Button
                variant="Link"
                p="0"
                isExternal _text={{
                  color: "red.400",
                }}
                  onPress={navigateToLoginWorkshop}> Here </Button> 
              </Flex>
            </Center>
          </VStack>
        </Center>
        <Center mt={7} >
          <Flex
          direction="row"
          >
            <Text>Don't have an account? </Text>
            <Button
            isExternal _text={{
              color: "red.400",
            }}
            variant="Link"
            p="0"
              onPress={navigateToRegisterCustomer}
              > Register Now</Button>
          </Flex>
        </Center>
      </VStack>
    </>
  )
}

const styles = StyleSheet.create({
  registerButton: {
    color: 'red'
  }
})