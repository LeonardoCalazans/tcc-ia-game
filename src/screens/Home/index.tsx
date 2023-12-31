import React, { useState } from "react";
import { Alert, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { handleSendingIA } from "../../api";
import { MMKV } from "react-native-mmkv";
import { Button, TextArea } from "../../components";
import { styles } from "./styles";

const Home = () => {
  const storage = new MMKV({ id: "chat-gpt" });
  const jsonchatHistory = storage.getString("chat") || "{}";
  const jk = JSON.parse(jsonchatHistory);

  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(jk);

  const saveStorage = (key: string, value: Array<ChatMessage>) => {
    storage.set(key, JSON.stringify(value));
  };

  const handleFetchIA = async () => {
    setIsLoading(true);
    try {
      const response = await handleSendingIA(
        `Continue atuando como mestre de RPG e continue a narrativa. Você pode fazer perguntas como "O que o personagem faz agora?". ${description}`
      );
      const newChatHistory = [
        ...chatHistory,
        { fromUser: true, message: description },
      ];

      newChatHistory.push({ fromUser: false, message: response as string });
      setChatHistory(newChatHistory);
      saveStorage("chat", newChatHistory);
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Erro", "Não foi possível acessar ao chat GPT.");
    } finally {
      setDescription("");
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chatHistory}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: item.fromUser ? "row-reverse" : "row",
              padding: 10,
            }}
          >
            <Text style={{ color: item.fromUser ? "red" : "white" }}>
              {item.message}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.content}>
        <TextArea
          placeholder="Escreva aqui o que gostaria de fazer agora."
          onChangeText={setDescription}
          value={description}
          editable={!isLoading}
        />
      </View>

      <View style={styles.options}>
        <Button title="Enviar" onPress={handleFetchIA} isLoading={isLoading} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
