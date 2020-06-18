import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Finished(props) {
  const { navigation, route } = props;
  const { title } = route.params;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("Select Workout");
        }}
      >
        <FontAwesomeIcon style={styles.star} size={130} icon={faStar} />
        <Text style={styles.text}>Congratulations!</Text>
        <Text style={styles.text}>You've completed: {title} workout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00adb5",
    alignItems: "center",
    // justifyContent: "center",
  },
  btn: {
    alignItems: "center",
  },
  star: {
    color: "white",
    marginTop: 80,
  },
  text: {
    fontSize: 30,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Verdana-Bold",
    marginTop: 10,
  },
});
