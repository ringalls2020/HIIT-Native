import React, { useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPauseCircle,
  faPlayCircle,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { Audio } from "expo-av";

export default function Timer(props) {
  const { navigation, route } = props;
  const { array, title } = route.params;
  const [time, setTime] = useState(array[0]);
  const [key, setKey] = useState(1);
  const [play, setPlay] = useState(true);
  const [reset, setReset] = useState(false);
  const [i, setI] = useState(0);
  const bell = require("./sounds/bell.mp3");

  handlePlaySound = async () => {
    const soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync(bell);
      await soundObject
        .playAsync()
        .then(async (playbackStatus) => {
          setTimeout(() => {
            soundObject.unloadAsync();
          }, playbackStatus.playableDurationMillis);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = () => {
    handlePlaySound();
    if (i < array.length) {
      setI(i + 1);
      setTime(array[i]);
      setKey(i);
      console.log({ i });
      return [true, 1];
    } else {
      navigation.navigate("Workout Complete", { title: title });
    }
  };

  const handlePause = () => {
    setPlay(!play);
  };

  const handleReset = () => {
    if (reset === false) {
      setReset(true);
    } else if (reset === true) {
      setPlay(false);
      setTime(array[0]);
      setKey(1);
      setPlay(true);
      setReset(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>{title}</Text>
      <CountdownCircleTimer
        key={key}
        duration={time}
        isPlaying={play}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        size={250}
        onComplete={handleComplete}
      >
        {({ remainingTime, animatedColor }) => (
          <Animated.Text
            style={{
              color: animatedColor,
              fontSize: 90,
              fontFamily: "Verdana-Bold",
            }}
          >
            {remainingTime}
          </Animated.Text>
        )}
      </CountdownCircleTimer>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={handleReset}>
          <FontAwesomeIcon style={styles.reset} size={50} icon={faUndo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePause}>
          <FontAwesomeIcon
            style={styles.play}
            size={70}
            icon={play ? faPauseCircle : faPlayCircle}
          />
        </TouchableOpacity>
      </View>
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
  Title: {
    fontSize: 50,
    color: "white",
    marginBottom: 80,
    marginTop: 50,
    fontFamily: "Verdana-Bold",
  },
  play: {
    justifyContent: "flex-start",
    color: "white",
    marginTop: 80,
    marginLeft: 30,
  },
  reset: {
    justifyContent: "flex-end",
    marginTop: 90,
    marginRight: 30,
    color: "white",
  },
});
