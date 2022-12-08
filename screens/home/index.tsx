import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "@rneui/themed";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

type params = {
  token: string;
};

import Playlists from "../playlists";
import NovaPlaylists from "../novaplaylist";
import PlaylistItems from "../playlistItems";
import AddItems from "../addItems";
import page2 from "../page2";

const Stack2 = createStackNavigator();

function MyStack2() {
  const route = useRoute();
  const { token } = route.params as params;
  const baseURL = "http://localhost:3030/";
  // const baseURL = "http://192.168.100.68:3030/";
  return (
    <Stack2.Navigator initialRouteName="playlists">
      {/* <Stack2.Navigator initialRouteName="addItems"> */}
      <Stack2.Screen
        name="playlists"
        component={Playlists}
        options={{ headerShown: false }}
        initialParams={{ token: token, baseURL: baseURL }}
      />
      <Stack2.Screen
        name="novaplaylist"
        component={NovaPlaylists}
        options={{ headerShown: false }}
        initialParams={{ token: token, baseURL: baseURL }}
      />
      <Stack2.Screen
        name="playlistItems"
        component={PlaylistItems}
        options={{ headerShown: false }}
        initialParams={{ token: token, baseURL: baseURL }}
      />
      <Stack2.Screen
        name="addItems"
        component={AddItems}
        options={{ headerShown: false }}
        initialParams={{ token: token, baseURL: baseURL }}
      />
      <Stack2.Screen
        name="page2"
        component={page2}
        options={{ headerShown: false }}
        initialParams={{ token: token, baseURL: baseURL }}
      />
    </Stack2.Navigator>
  );
}

export default function Page1({ navigation }: any) {
  const route = useRoute();
  const { token } = route.params as params;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header />
      <View style={styles.conteudo}>
        <MyStack2 />
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  conteudo: {
    flex: 1,
    width: "100%",
  },
  footer: {
    width: "100%",
    height: 100,
    backgroundColor: "#D9000F",
  },
});
