import { StatusBar } from "expo-status-bar";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { Text, Button } from "@rneui/themed";
import { CommonActions } from "@react-navigation/native";
import Header from "../../components/header";
import * as React from "react";
import { Video, AVPlaybackStatus } from "expo-av";

export default function Page1({ navigation }: any) {
  const video: any = React.useRef(null);
  const [status, setStatus] = React.useState<any>({} as any);
  const voltar = () => {
    navigation.navigate("login");
    // navigation.dispatch(CommonActions.goBack());
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "login" }],
    // });
  };

  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://youtu.be/G5443VNpfds",
          }}
          useNativeControls
          // resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? "Pause" : "Play"}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          />
        </View>
        <Text>FluTube - PAGE 2</Text>
        <Button
          title="Ir"
          onPress={() => navigation.navigate("playlists", { teste: "teste" })}
        />
        <Button title="Voltar" onPress={() => voltar()} />
      </View>
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
  barra: {
    width: "100%",
    height: 50,
    backgroundColor: "#D9000F",
  },
  conteudo: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    width: "100%",
    height: 100,
    backgroundColor: "#D9000F",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
