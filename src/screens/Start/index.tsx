import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleStartGame } from "../../api";

const StartScreen = () => {
  const navigation = useNavigation();

  const goToHome = async () => {
    const choice = await handleStartGame();
    navigation.navigate("Home");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f435",
      }}
    >
      <Text>Start Screen</Text>
      <Button title="Start" onPress={goToHome} />
    </View>
  );
};

export default StartScreen;
