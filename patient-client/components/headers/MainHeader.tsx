import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
// import { useLocation } from "@/hooks/useLocation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { common } from "@/constants/Styles";

const MainHeader = () => {
  const { top } = useSafeAreaInsets();
  // const { locationState, setLocality } = useLocation();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.Primary} />
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="menu" style={{paddingTop:10, color: Colors.Primary}} size={34} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={{fontFamily: common.defaultTitle, fontSize: 26, paddingTop:15, color: Colors.Primary}}>CuraGo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => router.navigate("/settings")}
      >
        <Ionicons name="person" size={20} color={Colors.Primary} />
      </TouchableOpacity>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: Colors.LightGrey,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
    backgroundColor: Colors.White,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locator: {
    width: 30,
    height: 30,
    marginTop: 7,
  },
  profileButton: {
    backgroundColor: Colors.LighterGrey,
    padding: 10,
    marginTop: 7,
    borderRadius: 50,
  },
});
