import { FlatList, View, Dimensions } from "react-native";
import { VStack } from "native-base";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";
import { URL } from "../constant/listurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BengkelCard from "../components/BengkelCard";
import blueIndicator from "../assets/images/blueMarker.png";
import currentIndicator from "../assets/images/Oval.png";
import LoadingMap from "../components/LoadingMap";
import { Box } from "native-base";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MapScreenCustomer() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [token, setToken] = useState({});

  const renderItem = ({ item }) => <BengkelCard workshop={item} />;

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
    const customerStorage = getData("customer").then((res) => {
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
          url: `${URL}/customers/near-workshop?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`,
        });
        setWorkshopNear(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (workshopNear === null) {
    return <LoadingMap></LoadingMap>;
  }

  return (
    <VStack>
      <MapView
        style={{ height: windowHeight * 0.6 }}
        initialRegion={currentLoc}
      >
        <Marker coordinate={currentLoc} image={currentIndicator} anchor={{x: 0.5, y: 0.5}} />
        {workshopNear.map((location, i) => (
          <Marker
            title={location.name}
            description={`${location.address.slice(0, 20)}...`}
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
