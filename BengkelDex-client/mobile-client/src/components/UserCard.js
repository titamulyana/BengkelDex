import { HStack, Text, Center, VStack, Image, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { mainColor } from "../constant/color";
export default function UserCard({ workshop }) {
  const navigation = useNavigation();
  function navigateToChat() {
    navigation.navigate("ChatScreen", { id: workshop.id, data: workshop });
  }
  return (
    <HStack
      space={4}
      justifyContent={"space-between"}
      mb={3}
      p={3}
      w={"full"}
      background={mainColor}
      rounded={"xl"}
      shadow="10"
    >
      <HStack space={3}>
        <Center>
          <Image
            size={50}
            borderRadius={"full"}
            source={{ uri: workshop.imgUrl }}
            alt={"Logo"}
          />
        </Center>
        <Center>
          <VStack>
            <Text isTruncated maxW="180">
              {workshop.name}
            </Text>
            <Text Text isTruncated maxW="160" w="80%">
              {workshop.address}
            </Text>
          </VStack>
        </Center>
      </HStack>
      <Center>
        <Button rounded={"md"} backgroundColor={"green.300"}>
          <Text onPress={navigateToChat}>Chat me !</Text>
        </Button>
      </Center>
    </HStack>
  );
}
