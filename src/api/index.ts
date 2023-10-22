import { Alert } from "react-native";
import { MMKV } from "react-native-mmkv";

const CHAT_GPD_API_KEY = process.env.CHAT_GPD_API_KEY;
const START_HISTORY = process.env.START_HISTORY;

const storage = new MMKV({ id: "chat-gpt" });

const saveStorage = (key: string, value: ChatMessage) => {
  storage.set(key, JSON.stringify(value));
};

export const handleStartGame = async () => {
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHAT_GPD_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Vamos jogar um jogo! Você é um grande escritor de ficção, fantasia e suspense. E decide narrar uma história onde o ouvinte tomara decisões que mudarão o rumo da história. A história é sobre uma investigação de assassinato que se passa na revolução industrial, o personagem principal um detetive que será o ouvinte deve investigar acontecimentos e pessoas para que ele encontre o assassino serial killer. Você impede o ouvinte de burlar as regras e criar situações impossiveis, exemplo: fazer o protagonista tenha super poderes, seja sobre humano, ou diga como outros personagens vão agir. Ele deve estar limitado as habilidades de um ser humano comum e apenans ao seu personagem. A história deve ser breve, mas o ouvinte decide o rumo dela e você adapita a cada mensagem, vamos começar agora.`,
        temperature: 0.5,
        max_tokens: 1000,
        model: "text-davinci-003",
      }),
    });
    const data = await response.json();
    saveStorage("chatHistory", {
      fromUser: false,
      message: data.choices[0].text,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    Alert.alert("Erro", "Não foi possível acessar ao chat GPT.");
  }
};

export const handleSendingIA = async (description: string) => {
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
    console.log(response);
    const data = await response.json();
    return data.choices[0].text;
  } catch (error) {
    console.error("Error sending message:", error);
    Alert.alert("Erro", "Não foi possível acessar ao chat GPT.");
  }
};
