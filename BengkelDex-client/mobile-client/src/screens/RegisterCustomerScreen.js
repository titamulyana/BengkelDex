import { Center, HStack, Text, VStack, Box, Input, Button, Link, Image } from "native-base"
import { mainColor } from "../constant/color"
import logo from "../images/BengkelDex.png"
import { useState } from "react"
import axios from "axios"
import { URL } from "../constant/listurl"
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function LoginScreen({ navigation }) {

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  })

  const loginWorkshop = () => {
    navigation.navigate("LoginWorkshop")
  }

  const submit = async () => {
    try {
      const url = URL + "/customers/register"
      const { data: response } = await axios({
        method: "POST",
        url: url,
        data: input
      })
      navigation.navigate("LoginCustomer")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <VStack
        space={5}
        mt={10}
      >
        <Center>
          <Image size={100} source={logo} alt={"Logo"} >
          </Image>
        </Center>
        <Center>
          <Box>
            <Text fontSize={'2xl'} fontWeight="extrabold" >Register Customer</Text>
          </Box>
        </Center>
        <Center>
          <VStack space={'2'} width="4/5">
            <Input
              onChangeText={(name) => setInput({ ...input, name })}
              placeholder="Name" />
            <Input
              onChangeText={(username) => setInput({ ...input, username })}
              placeholder="Username" 
              marginTop={windowHeight * 0.01}
              />
            <Input
              type="email"
              onChangeText={(email) => setInput({ ...input, email })}
              placeholder="Email" 
              marginTop={windowHeight * 0.01}
            />
            <Input
              onChangeText={(password) => setInput({ ...input, password })}
              type={"password"}
              placeholder="Password" 
              marginTop={windowHeight * 0.01}
            />
            <Input
              onChangeText={(phoneNumber) => setInput({ ...input, phoneNumber })}
              placeholder="Phone Number" 
              marginTop={windowHeight * 0.01}
              />
            <Input
              onChangeText={(address) => setInput({ ...input, address })}
              placeholder="Address" 
              marginTop={windowHeight * 0.01}
              />
            <Button bgColor={mainColor} onPress={submit}
            marginTop={windowHeight * 0.03}
            >Continue</Button>
          </VStack>
        </Center>
        <Center>
          <Button onPress={() => navigation.goBack()} 
          isExternal _text={{
            color: "red.400",
          }}
          variant="Link"
          p="0"
          > Goback</Button>
        </Center>
      </VStack>
    </>
  )
}