import { Loading } from "./src/components";
import Routes from "./src/routes";
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_700Bold,
  NotoSans_800ExtraBold,
} from "@expo-google-fonts/noto-sans";

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
    NotoSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return <Routes />;
}
