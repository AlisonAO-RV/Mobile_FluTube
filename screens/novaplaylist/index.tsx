import React, { useEffect, useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  View,
  Image,
  TextInput,
  Switch,
} from "react-native";
import { Text, Button } from "@rneui/themed";
import { CommonActions } from "@react-navigation/native";
import Header from "../../components/header";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "@rneui/base";
import RNPickerSelect from "react-native-picker-select";

type params = {
  token: string;
  baseURL: string;
};

type playlist = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  size: number;
};

type playlists = playlist[];

export default function NovaPlaylist({ navigation }: any) {
  const route = useRoute();
  const { token, baseURL } = route.params as params;

  const [playlists, setPlaylists] = useState<string>("");

  const [visualizacao, setVisualizacao] = useState("");

  const [load, setLoad] = useState<boolean>(false);

  const voltar = () => {
    navigation.navigate("playlists");
    // navigation.dispatch(CommonActions.goBack());
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "playlists" }],
    // });
  };

  async function addPlayList() {
    console.log(token);
    setLoad(true);
    const response = await fetch(`${baseURL}addPlayList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        title: playlists,
        privacyStatus: visualizacao,
      }),
    })
      .then(async () => {
        setTimeout(async () => {
          await navigation.reset({
            index: 0,
            routes: [{ name: "playlists" }],
          });
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button color={"#D9000F "} onPress={() => voltar()}>
          <Image
            source={require("../../assets/undo.png")}
            style={styles.sombra}
          />
        </Button>
        <Text style={styles.txtHeader}>Nova Playlist</Text>
        <View style={styles.espaco}></View>
      </View>
      <ScrollView style={styles.conteudo}>
        <View style={styles.item}>
          <Text style={styles.txtHeader}>Titulo da Playlist</Text>
          {/* <Input placeholder="Adicione um Titulo" multiline maxLength={150} /> */}
          <TextInput
            style={styles.input}
            onChangeText={(e) => setPlaylists(e)}
            value={playlists}
            placeholder="Adicione um titulo"
            keyboardType="default"
            multiline
            maxLength={150}
          />
          <Text style={styles.txtContador}>{playlists.length}/150</Text>
        </View>
        <View style={styles.item2}>
          <Text style={styles.txtHeader}>Visibilidade</Text>
          <RNPickerSelect
            style={{
              inputIOS: {
                fontSize: 18,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderRadius: 4,
                color: "black",
                textAlign: "center",
                paddingRight: 30, // to ensure the text is never behind the icon
              },
            }}
            onValueChange={(value: any) => setVisualizacao(value)}
            items={[
              { label: "Publico", value: "public" },
              { label: "Privado", value: "private" },
            ]}
            placeholder={{
              label: "Selecione uma opção",
              value: null,
            }}
          />
        </View>
        <Button
          title="CRIAR"
          color="#D9000F"
          onPress={() => addPlayList()}
          loading={load}
        />
        <Button
          type="clear"
          onPress={() => navigation.navigate("playlists", { token, baseURL })}
        >
          <Text style={styles.btCancelar}>Cancelar</Text>
        </Button>
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
    height: 300,
    marginTop: 25,
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
    padding: 15,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  item2: {
    width: "100%",
    height: 100,
    marginTop: 5,
    backgroundColor: "#FFF",
    marginBottom: 25,
    borderRadius: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  txtContador: {
    fontSize: 16,
    color: "#707070",
    alignSelf: "flex-end",
  },
  txtItem: {
    fontSize: 18,
    fontWeight: "600",
    color: "#707070",
  },
  espaco: {
    width: 36,
  },
  input: {
    width: "100%",
    height: 200,
    // backgroundColor: "#F2F2F2",
    color: "#707070",
    borderRadius: 9,
    marginTop: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 24,
  },
  switch: {
    marginTop: 10,
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#F2F2F2",
    color: "#707070",
    borderRadius: 9,
    marginTop: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 24,
  },
  btCancelar: {
    // backgroundColor: "#D9000F",
    marginTop: 15,
    color: "#D9000F",
    fontSize: 20,
  },
});
