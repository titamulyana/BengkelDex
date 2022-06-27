import { View, Text, StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg';

export default function BarcodeScreen({route}) {
  const workshopId = String(route.params.data)
  console.log(workshopId)
  return (
    <View style={styles.container}>
      <Text style={{bottom: 20}}>Scan the following Barcode for non-cash payment:</Text>
      <QRCode size={200}
      value={String(route.params.data)}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});
