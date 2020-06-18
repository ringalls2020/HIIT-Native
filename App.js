import "react-native-gesture-handler";
import React from "react";
import Home from "./components/Home";
import Form from "./components/WorkoutForm";
import Timer from "./components/timer";
import Finished from "./components/finished";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { StackNavigator } from "react-navigation";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Select Workout" component={Home} />
        <Stack.Screen name="Create New Workout" component={Form} />
        <Stack.Screen name="Workout Timer" component={Timer} />
        <Stack.Screen name="Workout Complete" component={Finished} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
