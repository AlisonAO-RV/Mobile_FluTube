import React, { useEffect, useState } from "react";
import { GestureResponderEvent, StyleSheet, View, Image } from "react-native";
import { Text, Button } from "@rneui/themed";
import { CommonActions } from "@react-navigation/native";
import Header from "../../components/header";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

type params = {
  token: string;
  baseURL: string;
  new: boolean;
};

type playlist = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  size: number;
};

type playlists = playlist[];

export default function Playlists({ navigation }: any) {
  const route = useRoute();
  const { token, baseURL } = route.params as params;

  const [playlists, setPlaylists] = useState<playlists>([] as playlists);

  const NovaPlaylist = () => {
    navigation.navigate("novaplaylist");
    // navigation.dispatch(CommonActions.goBack());
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "login" }],
    // });
  };

  async function PlaylistItems(id: string, title: string) {
    navigation.navigate("playlistItems", { idPlaylist: id, title: title });
  }

  async function getPlayLists() {
    console.log(token);
    try {
      const response = await fetch(`${baseURL}playlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPlayLists();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtHeader}>Playlists do Canal</Text>
        <Button color={"#D9000F "} onPress={() => NovaPlaylist()}>
          <Image
            source={require("../../assets/plus.png")}
            style={styles.sombra}
          />
        </Button>
      </View>
      <ScrollView style={styles.conteudo}>
        {playlists.map((playlist, index) => (
          <View style={styles.item} key={index}>
            <Text style={styles.txtItem}>{playlist.title}</Text>
            <Button
              color={"#D9000F "}
              onPress={() => PlaylistItems(playlist.id, playlist.title)}
            >
              <Image
                source={require("../../assets/btPlay.png")}
                style={styles.sombra}
              />
            </Button>
          </View>
        ))}
      </ScrollView>
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
  header: {
    width: "100%",
    height: 50,
    paddingLeft: 15,
    paddingRight: 20,
    paddingTop: 10,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtHeader: {
    fontSize: 25,
    color: "#707070",
  },
  sombra: {
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  conteudo: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: "100%",
    // alignItems: "center",
    // justifyContent: "center",
  },
  item: {
    width: "100%",
    height: 70,
    backgroundColor: "#FFF",
    marginBottom: 15,
    borderRadius: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    paddingLeft: 15,
    paddingRight: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtItem: {
    fontSize: 18,
    fontWeight: "600",
    color: "#707070",
  },
});
