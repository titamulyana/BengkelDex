import { Center, Flex, Text, VStack, Box, Input, Button, Link, Image } from "native-base"
import { mainColor } from "../constant/color"
import logo from "../images/BengkelDex.png"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";
import { URL } from "../constant/listurl"
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoginWorkshopScreen({ navigation }) {

  const [input, setInput] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {

  },[])

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(`@${key}`, jsonValue)
    } catch (e) {
      // saving error
      console.log(e);
    }
  }
  
  const loginWorkshop = async () => {
    try {
      console.log('ppp')
      const url = URL + '/workshops/login'
      console.log(url, 'url');
      console.log(2222);
      const {data: workshop} = await axios.post(url, input)
      // console.log(workshop);
      await storeData('workshop', workshop)
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreenWorkshop' }],
        })
    } catch (err) {
      console.log(err);
    }
  }

  const navigateToRegisterWorkshop = () => {
    navigation.navigate("RegisterWorkshop")
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
            <Text fontSize={'2xl'} fontWeight="extrabold" >Login Workshop</Text>
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
            <Button bgColor={mainColor} onPress={loginWorkshop} 
            marginTop={windowHeight * 0.03}
            >Continue</Button>
            <Center
            marginTop={windowHeight * 0.01}
            
            >
              <Flex direction="row">
                <Text
                  textAlign={"center"}
                >Or register your workshop! </Text>
                <Button
                variant="Link"
                p="0"
                isExternal _text={{
                  color: "red.400",
                }}
                onPress={navigateToRegisterWorkshop}>Register Now</Button>
              </Flex>
            </Center>
            <Button color={mainColor} onPress={() => navigation.goBack()} 
            variant="Link"
            p="0"
            isExternal _text={{
              color: "red.400",
            }}
            > Goback</Button>
          </VStack>
        </Center>
      </VStack>
    </>
  )
}