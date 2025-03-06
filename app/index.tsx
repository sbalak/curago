import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
      
  const { authState } = useAuth();  

  return (  
    authState.authenticated === null ? (<View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}><Text>Loading...</Text></View>) : ((authState.authenticated) ?  <Redirect href="/dashboard" /> : <Redirect href="/login" />)
  );
}