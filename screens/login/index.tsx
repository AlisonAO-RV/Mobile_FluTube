import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import * as AuthSession from "expo-auth-session";
import { Button } from "@rneui/base";

type AuthResponse = {
  type: string;
  params: {
    access_token: string;
  };
};

export default function Login({ navigation }: any) {
  async function entrar() {
    const CLIENT_ID =
      "777654250358-ngacg622jeisudrj33lul60a2mggs3ll.apps.googleusercontent.com";
    const REDIRECT_URI = "https://auth.expo.io/@alisonao/flutube-app";
    const RESPONSE_TYPE = "token";
    const SCOPE = encodeURI(
      "profile email https://www.googleapis.com/auth/youtube"
    );
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}`;

    const response = (await AuthSession.startAsync({
      authUrl,
    })) as AuthResponse;

    // console.log(response);

    const { type, params } = response;

    type === "success" &&
      navigation.navigate("home", { token: params.access_token });

    // navigation.navigate("page1", { teste: "teste" });
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "home" }],
    // });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.logo}>
        <Image source={require("../../assets/logo.png")} />
      </View>
      <View style={styles.button}>
        <Button color={"#FFF"} onPress={() => entrar()}>
          <Image source={require("../../assets/btGoogle.png")} />
        </Button>
      </View>
      <View style={styles.footer}>
        <Image source={require("../../assets/img_login.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 6,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    // backgroundColor: "blue",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 3,
  },
});
