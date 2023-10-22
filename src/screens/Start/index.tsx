import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleStartGame } from "../../api";
import { Button } from "../../components";

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
      }}
    >
      <Text>Start Screen</Text>
      <Button title="Start" onPress={goToHome} />
    </View>
  );
};

export default StartScreen;
