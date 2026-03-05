import { Button, Text, View } from "react-native";
import { useAuth } from "../src/auth/AuthProviderWithGoogle";

export default function SignIn() {
  const { signIn } = useAuth();

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Text>Login Screen</Text>

      <Button
        title="Sign in with Google"
        onPress={signIn}
      />
    </View>
  );
}