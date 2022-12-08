import React, { useEffect, useState, useCallback } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  View,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
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

  const [search, setSearch] = useState<string>("hoje");
  const [loadin, setLoadin] = useState<boolean>(false);

  const voltar = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "playlistItems", params: { idPlaylist, title } }],
    });
  };

  async function getSearch() {
    try {
      setLoadin(true);
      const response = await fetch(`${baseURL}SearchVideos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, search: search }),
      });
      const data = await response.json();
      setPlaylistItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadin(false);
    }
  }

  const removeDaPlaylist = useCallback(
    (id: string) => {
      const newPlaylist = playlistItems.filter((item) => item.id !== id);
      setPlaylistItems(newPlaylist);
    },
    [playlistItems]
  );

  async function AddParaPlaylist(idVideo: string) {
    setLoadin(true);
    try {
      const response = await fetch(`${baseURL}addItemsPlaylist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          playlistsID: idPlaylist,
          videoID: idVideo,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 400) {
        console.log("Erro");
      }
      // removeDaPlaylist(idVideo);
      setTimeout(async () => {
        await navigation.reset({
          index: 0,
          routes: [{ name: "playlistItems", params: { idPlaylist, title } }],
        });
      }, 500);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSearch();
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
        <Button color={"#D9000F "} onPress={() => voltar()}>
          <Image
            source={require("../../assets/undo.png")}
            style={styles.sombra2}
          />
        </Button>
      </View>
      <View style={styles.titleB}>
        <Text style={styles.txtTitle2}>Adicionar Vídios</Text>
        <View style={styles.LinhaBuscar}>
          <ImageBackground
            source={require("../../assets/lupa.png")}
            resizeMode="contain"
            imageStyle={styles.lupa}
          >
            <TextInput
              style={styles.input}
              placeholder="Procurar Vídeos"
              keyboardType="default"
              maxLength={60}
              onChangeText={(value) => setSearch(value)}
            />
          </ImageBackground>
          <Button
            color={"#D9000F"}
            onPress={() => getSearch()}
            buttonStyle={styles.btnBuscar}
            loading={loadin}
          >
            <Text style={styles.txtBUSCAR}>BUSCAR</Text>
          </Button>
        </View>
      </View>
      <ScrollView style={styles.conteudo}>
        {playlistItems.map((playlist, index) => (
          <View style={styles.item} key={index}>
            <Image
              source={{ uri: playlist.thumbnail.url }}
              style={styles.imagenLeft}
            />

            <Text style={styles.txtItem} numberOfLines={2}>
              {playlist.title}
            </Text>

            <Button
              color={"#D9000F "}
              onPress={() => AddParaPlaylist(playlist.id)}
            >
              <Image
                source={require("../../assets/plus.png")}
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
  input: {
    width: 280,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 35,
  },
  lupa: {
    width: 15,
    height: 15,
    marginLeft: 25,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBuscar: {
    width: 65,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 5,
  },
  LinhaBuscar: {
    // display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    // width: "100%",
  },
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
    // paddingRight: 123,
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
  txtBUSCAR: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "bold",
  },
  titleB: {
    width: "100%",
    padding: 5,
  },
  txtTitle2: {
    textAlign: "center",
    fontSize: 22,
    color: "#707070",
    fontWeight: "500",
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
  sombra2: {
    opacity: 0,
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
