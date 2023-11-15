import { Alert } from "react-native";
import { MMKV } from "react-native-mmkv";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const START_HISTORY = process.env.START_HISTORY;

const storage = new MMKV({ id: "chat-gpt" });
const saveStorage = (key: string, value: ChatMessage) => {
  storage.set(key, JSON.stringify(value));
};

export const handleStartGame = async (): Promise<any> => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        max_tokens: 1000,
        messages: [
          {
            role: "system",
            content: START_HISTORY,
          },
        ],
      }),
    });

    const data = (await response.json()) as ChatResponse;
    saveStorage("chat", {
      fromUser: false,
      message: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    Alert.alert("Erro", "Não foi possível acessar ao chat GPT.");
  }
};

export const handleSendingIA = async (description: string) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: description,
          },
        ],
      }),
    });

    const data = (await response.json()) as ChatResponse;
    saveStorage("chat", {
      fromUser: false,
      message: data.choices[0].message.content,
    });

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error sending message:", error);
    Alert.alert("Erro", "Não foi possível acessar ao chat GPT.");
  }
};
