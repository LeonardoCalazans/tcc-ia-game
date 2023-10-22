import { Alert } from "react-native";

const CHAT_GPD_API_KEY = process.env.CHAT_GPD_API_KEY;
const START_HISTORY = process.env.START_HISTORY;

export const handleStartGame = async () => {
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHAT_GPD_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: START_HISTORY,
        temperature: 0.5,
        max_tokens: 1000,
        model: "text-davinci-003",
      }),
    });
    const data = await response.json();
    return data.choices[0].text;
  } catch (error) {
    console.error("Error sending message:", error);
    Alert.alert("Erro", "Não foi possível acessar ao chat GPT.");
  }
};
