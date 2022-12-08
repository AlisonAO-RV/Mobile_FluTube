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
  idPlaylist: string;
  title: string;
};

type playlist = {
  id: string;
  title: string;
  thumbnail: {
    url: string;
  };
};

type playlists = playlist[];

export default function PlaylistItems({ navigation }: any) {
  const route = useRoute();
  const { token, baseURL, idPlaylist, title } = route.params as params;

  const [playlistItems, setPlaylistItems] = useState<playlists>(
    [] as playlists
  );

  const voltar = () => {
    navigation.navigate("playlists");
  };

  async function getPlayLists() {
    console.log(token);
    try {
      const response = await fetch(`${baseURL}playlistItems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, playlistId: idPlaylist }),
      });
      const data = await response.json();
      setPlaylistItems(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // console.log("aqui: ", idPlaylist);
    getPlayLists();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button color={"#D9000F "} onPress={() => voltar()}>
          <Image
            source={require("../../assets/undo.png")}
            style={styles.sombra}
          />
        </Button>
        <View style={styles.headerText}>
          <Text style={styles.title}>Playlist</Text>
          <Text style={styles.txtHeader}>{title}</Text>
        </View>
        <Button
          color={"#D9000F "}
          onPress={() =>
            navigation.navigate("addItems", {
              token,
              baseURL,
              idPlaylist,
              title,
            })
          }
        >
          <Image
            source={require("../../assets/plus.png")}
            style={styles.sombra}
          />
        </Button>
      </View>
      <ScrollView style={styles.conteudo}>
        {playlistItems.map((playlist, index) => (
          <View style={styles.item} key={index}>
            <Image
              source={{
                uri: playlist.thumbnail
                  ? playlist.thumbnail.url
                  : "http://localhost:3030/img/Flutube.png",
              }}
              style={styles.imagenLeft}
            />

            <Text style={styles.txtItem} numberOfLines={2}>
              {playlist.title}
            </Text>

            <Button color={"#D9000F "} onPress={() => voltar()}>
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
    height: 55,
    paddingLeft: 15,
    paddingRight: 20,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D9000F",
  },
  headerText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 12,
  },
  txtHeader: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  imagenLeft: {
    width: 90,
    height: 50,
    marginRight: 10,
    borderRadius: 3,
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
    paddingLeft: 10,
    paddingRight: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtItem: {
    width: "55%",
    fontSize: 18,
    fontWeight: "500",
    color: "#707070",
  },
});
