import { StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import login from "./screens/login";
import home from "./screens/home";
// import page2 from "./screens/page2";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home"
        component={home}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="page2"
        component={page2}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topo: {
    width: "100%",
    height: 50,
    backgroundColor: "green",
  },
});
