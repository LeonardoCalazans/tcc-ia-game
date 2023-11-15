import { NativeModules } from "react-native";
import Reactotron from "reactotron-react-native";

declare global {
  interface Console {
    tron: any;
  }
}

if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode;
  const scriptHostname = scriptURL.split("://")[1].split(":")[0];
  const tron = Reactotron.configure({ host: scriptHostname })
    .useReactNative({
      asyncStorage: false, // there are more options to the async storage.
      networking: {
        // optionally, you can turn it off with false.
        ignoreUrls: /\/*https:\/\/clients3.google.com\/generate_204*\?_=\d*/,
      },
      editor: false, // there are more options to editor
      errors: { veto: (stackFrame) => false }, // or turn it off with false
      overlay: false, // just turning off overlay
    })
    .connect();

  console.tron = tron;
}
