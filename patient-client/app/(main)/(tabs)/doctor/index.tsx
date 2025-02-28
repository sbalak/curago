import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import ConsultNowButtonContainer from "@/components/ConsultNowButtonContainer";

const doctors = [
  {
    id: 1,
    name: "Dr. Smith",
    specialty: "Cardiology",
    price: "$50",
    slots: ["10:00 AM", "2:00 PM", "5:00 PM"],
  },
  {
    id: 2,
    name: "Dr. Johnson",
    specialty: "Dermatology",
    price: "$40",
    slots: ["11:00 AM", "3:00 PM", "6:00 PM"],
  },
];

const DoctorScreen = () => {
  // const route = useRoute();
  // const { speciality } = route.params;
  const { specialityId, specialityName } = useLocalSearchParams() || {}; // Get speciality param

  const handleDoctorSelection = (doctor) => {
    router.navigate({
      pathname: "/doctor/" + doctor.id,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Doctors for {specialityName}</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.specialty}>{item.specialty}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <View style={{ marginTop: 16 }}>
              <ConsultNowButtonContainer
                onPress={() => handleDoctorSelection(item)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E9F5DB", // Soft Green Background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C5F2D",
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  card: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Glass effect
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(163, 197, 133, 0.5)",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C5F2D",
  },
  specialty: {
    fontSize: 16,
    color: "#557C55",
    marginTop: 5,
  },
  price: {
    fontSize: 18,
    color: "#3E7C17",
    marginTop: 5,
    fontWeight: "600",
  },
  slotsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    color: "#34495e",
  },
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  slot: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#3E7C17",
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3E7C17",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  slotText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
