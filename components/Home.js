import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function Home(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>-- OR --</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Create New Workout");
        }}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Create Workout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303841",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    color: "white",
  },
  btn: {
    backgroundColor: "slateblue",
    width: 200,
    height: 50,
    borderRadius: 50,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    paddingTop: 13,
    fontSize: 20,
  },
});
