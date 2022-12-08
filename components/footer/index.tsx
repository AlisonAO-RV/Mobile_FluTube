import { StyleSheet, View, Image } from "react-native";
import { Button } from "@rneui/base";
import { Text } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";

type params = {
  token: string;
};

export default function footer({ navigation }: any) {
  const route = useRoute();
  const { token } = route.params as params;

  // curl -d -X -POST --header "Content-type:application/x-www-form-urlencoded" \
  //       https://oauth2.googleapis.com/revoke?token={token}

  async function logof() {
    await fetch(`https://oauth2.googleapis.com/revoke?token=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    navigation.navigate("login");
  }

  return (
    <View style={styles.container}>
      <Button color={"#D9000F"} onPress={() => console.log("aqui")}>
        <Image source={require("../../assets/btPlay.png")} />
      </Button>
      <Button
        color={"#D9000F"}
        onPress={() => navigation.navigate("playlists")}
      >
        <Image source={require("../../assets/btHome.png")} />
      </Button>
      <Button color={"#D9000F "} onPress={() => logof()}>
        <Image source={require("../../assets/btMenu.png")} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 75,
    display: "flex",
    flexDirection: "row",
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
    alignItems: "baseline",
    backgroundColor: "#D9000F",
  },
  image: {
    width: 36,
    height: 36,
  },
  bt: {
    width: 36,
    height: 36,
    backgroundColor: "#D9000F",
  },
});
