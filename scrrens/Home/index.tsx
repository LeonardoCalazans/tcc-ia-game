import React, { useState } from "react";
import { Alert, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextArea } from "../../components";

const CHAT_GPD_API_KEY = process.env.CHAT_GPD_API_KEY;

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {} as { fromUser: boolean; message: string },
  ]);

  const handleFetchIA = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CHAT_GPD_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: description,
          temperature: 0.5,
          max_tokens: 1000,
          model: "text-davinci-003",
        }),
      });
      const data = await response.json();
      const newChatHistory = [
        ...chatHistory,
        { fromUser: true, message: description },
      ];

      newChatHistory.push({ fromUser: false, message: data.choices[0].text });
      setChatHistory(newChatHistory);
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Erro", "Não foi possível acessar ao chat GPT.");
    } finally {
      setDescription("");
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
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
      <View style={{}}>
        <TextArea
          placeholder="Escreva aqui o que gostaria de fazer agora."
          onChangeText={setDescription}
          value={description}
          editable={!isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
