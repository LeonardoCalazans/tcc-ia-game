import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StartScreen, Home } from "../scrrens";

const PublicRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="StartScreen">
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
