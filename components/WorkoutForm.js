import React, { useState } from "react";
import * as yup from "yup";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Icon,
  Keyboard,
} from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

export default function WorkoutForm(props) {
  const { navigation } = props;
  const [complete, setComplete] = useState(false);
  const [workout, setWorkout] = useState({
    work: 0,
    rest: 0,
    reps: 0,
    sets: 0,
    break: 0,
    title: "",
  });
  const WorkoutSchema = yup.object().shape({
    title: yup.string().required(),
    work: yup.number().required(),
    rest: yup.number().required(),
    reps: yup.number().required(),
    sets: yup.number().required(),
    break: yup.number().required(),
  });

  const startWorkout = () => {
    WorkoutSchema.isValid(workout).then((valid) => {
      if (valid) {
        let array = [10];
        for (let i = workout.sets; i > 0; i--) {
          for (let j = workout.reps; j > 0; j--) {
            array.push(workout.work);
            array.push(workout.rest);
          }
          array.pop();
          array.push(workout.break * 60);
        }
        array.pop();

        navigation.navigate("Workout Timer", {
          array: array,
          title: workout.title,
        });
      } else {
        setComplete(true);
      }
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.entry}>
        <TextInput
          style={styles.textInput}
          name="title"
          placeholder="Exercise Title"
          onChangeText={(text) =>
            setWorkout((prevValue) => {
              return {
                ...prevValue,
                title: text,
              };
            })
          }
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.entry}>
        <TextInput
          style={styles.textInput}
          placeholder="WORK (Seconds)"
          keyboardType={"numbers-and-punctuation"}
          onChangeText={(text) =>
            setWorkout((prevValue) => {
              return {
                ...prevValue,
                work: text,
              };
            })
          }
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.entry}>
        <TextInput
          style={styles.textInput}
          placeholder="REST (Seconds)"
          keyboardType={"numbers-and-punctuation"}
          onChangeText={(text) =>
            setWorkout((prevValue) => {
              return {
                ...prevValue,
                rest: text,
              };
            })
          }
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.entry}>
        <TextInput
          style={styles.textInput}
          placeholder="REPS (Per Set)"
          keyboardType={"numbers-and-punctuation"}
          onChangeText={(text) =>
            setWorkout((prevValue) => {
              return {
                ...prevValue,
                reps: text,
              };
            })
          }
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.entry}>
        <TextInput
          style={styles.textInput}
          placeholder="SETS (Per Workout)"
          keyboardType={"numbers-and-punctuation"}
          onChangeText={(text) =>
            setWorkout((prevValue) => {
              return {
                ...prevValue,
                sets: text,
              };
            })
          }
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.entry}>
        <TextInput
          style={styles.textInput}
          placeholder="BREAK (Min. between Sets)"
          keyboardType={"numbers-and-punctuation"}
          onChangeText={(text) =>
            setWorkout((prevValue) => {
              return {
                ...prevValue,
                break: text,
              };
            })
          }
        />
      </TouchableOpacity>
      {complete && (
        <Text style={styles.errorMsg}>
          Error: Please Complete All Fields With Proper Units
        </Text>
      )}
      <TouchableOpacity style={styles.btnBackground} onPress={startWorkout}>
        <FontAwesomeIcon style={styles.play} size={130} icon={faPlayCircle} />
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
  textInput: {
    fontSize: 22,
    textAlign: "center",
    paddingTop: 12,
  },
  entry: {
    backgroundColor: "white",
    width: 300,
    height: 50,
    borderRadius: 10,
    marginTop: 25,
  },
  play: {
    color: "red",
  },
  btnBackground: {
    backgroundColor: "white",
    borderRadius: 100,
    marginTop: 45,
  },
  errorMsg: {
    marginTop: 10,
  },
});
