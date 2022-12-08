import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";
type params = {
  token: string;
};

type loadProfileYouTube = {
  nome: string;
  url: string;
};
type profile = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: string;
};

export default function Page1({ navigation }: any) {
  const [profile, setProfile] = useState<loadProfileYouTube>({
    nome: "",
    url: "",
  } as loadProfileYouTube);

  const route = useRoute();
  const { token } = route.params as params;

  async function loadProfileYouTube() {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?access_token=${token}&part=snippet&mine=true`
    );

    const data = await response.json();
    const nome = data.items ? data.items[0].snippet.title : "";
    const url = data.items ? data.items[0].snippet.thumbnails.default.url : "";
    setProfile({ nome, url });
  }

  useEffect(() => {
    loadProfileYouTube();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.barra} />
      <View style={styles.conteudo}>
        <View style={styles.header1}>
          <Text style={styles.txt1}>SEU CANAL</Text>
          <Text style={styles.txt2}>{profile.nome}</Text>
        </View>
        <View style={styles.header2}>
          <View style={styles.imagem}>
            {profile.url && (
              <Image source={{ uri: profile.url }} style={styles.img} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 115,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  barra: {
    width: "100%",
    height: 50,
    backgroundColor: "#D9000F",
  },
  conteudo: {
    flex: 1,
    width: "100%",
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imagem: {
    borderRadius: 30,
    backgroundColor: "#FFF",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  header1: {
    width: "70%",
    height: 65,
    justifyContent: "center",
  },
  txt1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#505050",
  },
  txt2: {
    fontSize: 14,
    color: "#707070",
  },
  header2: {
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
  },
});
