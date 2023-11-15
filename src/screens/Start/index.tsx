import React, { useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleStartGame } from "../../api";
import { Button } from "../../components";
import { MMKV } from "react-native-mmkv";

const StartScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const storage = new MMKV({ id: "chat-gpt" });
  const jsonchatHistory = storage.getString("chat");

  const goToHome = async () => {
    try {
      setLoading(true);
      await handleStartGame();
      navigation.navigate("Home");
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
          padding: 10,
        }}
      >
        ESTUDO DE DESENVOLVIMENTO DE JOGO TEXTUAL INTERATIVO COM IA{" "}
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 10,
          padding: 10,
        }}
      >
        Esse app tem como objetivo simular um jogo de RPG onde a IA atue como
        narrador da história e o usuário como jogador
      </Text>
      <View>
        <View style={{ marginBottom: 10 }}>
          <Button
            title={jsonchatHistory ? "Começar nova jogo" : "Começar"}
            onPress={goToHome}
            isLoading={loading}
          />
        </View>
        {jsonchatHistory && (
          <Button
            title="Continue"
            onPress={() => navigation.navigate("Home")}
            isLoading={loading}
          />
        )}
      </View>
    </View>
  );
};

export default StartScreen;
