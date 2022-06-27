import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import LoadingAll from "../components/LoadingAll";
import currentIndicator from "../assets/images/Oval.png";
import blueIndicator from "../assets/images/blueMarker.png";
import { mainColor } from "../constant/color";
import { Center, Text } from "native-base";
import pin from "../assets/images/pin.png";

export default function LiveLocation({ route }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Initial
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setState({
        ...state,
        endLoc: {
          latitude: route.params.data.location.coordinates[1],
          longitude: route.params.data.location.coordinates[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        currentLoc: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        startLoc: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    })();
  }, []);

  // Live tracking
  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setState({
          ...state,
          currentLoc: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      })();
    }, 100);
    return () => clearInterval(interval);
  });

  const [state, setState] = useState({
    startLoc: {
      latitude: null,
      longitude: null,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    currentLoc: {
      latitude: 30.7046,
      longitude: 76.7179,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    endLoc: {
      latitude: null,
      longitude: null,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const mapRef = useRef();

  const { startLoc, currentLoc, endLoc } = state;
  if (state.endLoc.latitude === null) {
    return <LoadingAll></LoadingAll>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={currentLoc}
        >
          <Marker
            coordinate={currentLoc}
            image={currentIndicator}
            anchor={{ x: 0.5, y: 0.5 }}
          />
          <Marker coordinate={endLoc} image={blueIndicator} />

          <MapViewDirections
            origin={currentLoc}
            destination={endLoc}
            apikey="AIzaSyAAjzQFBz9jwJrx5p9CAgOLZgHoqfK7Wa8"
            strokeWidth={3}
            strokeColor="#3399FF"
            optimizeWaypoints={true}
            onReady={(result) => {
              setDuration(result.duration);


            }}
          />
          <MapViewDirections
            origin={startLoc}
            destination={endLoc}
            apikey="AIzaSyAAjzQFBz9jwJrx5p9CAgOLZgHoqfK7Wa8"
            strokeWidth={3}
            strokeColor="gray"
            optimizeWaypoints={true}
            onReady={(result) => {

              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 100,
                  left: 30,
                  top: 100,
                },
              });
            }}
          />
        </MapView>
      </View>
      <Center>
        <View style={styles.bottomCard}>
          <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 8 }}>
            <Image source={pin} style={{ width: 30, height: 30 }} />
            <Text>{route.params.data.address.slice(0, 25)}...</Text>
          </View>
          <Text p="0" m="0" pr="3" bold>
            {Math.ceil(duration)} mins
          </Text>
        </View>
      </Center>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    position: "absolute",
    bottom: 650,
    width: 350,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
