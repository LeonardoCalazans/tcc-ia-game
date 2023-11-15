declare type ChatResponse = {
  id: string;
  object: string;
  created: number;
  choices: Array<ChatMessageResponse>;
};

declare type ChatMessageResponse = {
  index: number;
  message: {
    role: string;
    content: string;
  };
};
