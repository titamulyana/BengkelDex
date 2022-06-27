import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import LottieView from 'lottie-react-native';

export default function LoadingMap() {
  return (
  <View style={[styles.container, styles.horizontal]}>
    <LottieView source={require('../assets/loadingMap.json')} autoPlay loop />
  </View> 
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});