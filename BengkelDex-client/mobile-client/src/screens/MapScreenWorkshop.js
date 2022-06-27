import { FlatList, View, Dimensions } from "react-native";
import { Text, Center } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack } from "native-base";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";
import { URL } from "../constant/listurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BengkelCard from "../components/BengkelCard";
import imageMarker from "../images/customMarker.png"
import LoadingMap from "../components/LoadingMap";
import { useIsFocused } from "@react-navigation/native";
import blueIndicator from "../assets/images/blueMarker.png";
import currentIndicator from "../assets/images/Oval.png";
import UserCard from "../components/UserCard";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function MapScreenWorkshop() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [token, setToken] = useState({});
  const isFocused = useIsFocused();
  const renderItem = ({ item }) => <UserCard workshop={item} />;

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };
  const [currentLoc, setCurrentLoc] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [workshopNear, setWorkshopNear] = useState(null);

  const [workshops, setWorkshops] = useState(null);
  useEffect(() => {
    const customerStorage = getData("workshop").then((res) => {
      setToken(res.token);
    });
  });

  // Initial
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLoc({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        const { data } = await axios({
          method: "get",
          url: `${URL}/workshops/need-help?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`,
        });
        setWorkshopNear(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isFocused]);
  
  if (workshopNear === null) {
    return <LoadingMap/>
  }

  return (
      <VStack>
        <MapView style={{ height: windowHeight * 0.6 }} initialRegion={currentLoc}>
          <Marker coordinate={currentLoc} image={currentIndicator} />
          {workshopNear.map((location, i) => (
            <Marker
            title={location.name}
            description={`${location.address.slice(0,20)}...`}
            image={blueIndicator}
              coordinate={{
                latitude: location.location.coordinates[1],
                longitude: location.location.coordinates[0],
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              key={i}
            />
          ))}
        </MapView>
        <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          bottom: 40,
          backgroundColor: "white",
          height: windowHeight * 0.6
        }}
      >
        <FlatList
          data={workshopNear}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: 20,
            marginHorizontal: 20,
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
        />
      </View>
      </VStack>
  );
}
