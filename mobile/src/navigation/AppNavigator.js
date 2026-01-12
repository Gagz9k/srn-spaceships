import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "../screens/ListScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Spaceships" component={ListScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Detalle" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
