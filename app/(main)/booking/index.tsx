import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const BookingScreen = () => {
  const { doctorName, specialty, price, selectedSlot } = useLocalSearchParams();

  const handleBooking = () => {
    alert("✅ Booking Confirmed! 🎉");
    router.back(); // Navigate back after booking
  };

  return (
    <LinearGradient colors={["#E9F5DB", "#A3C585"]} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Confirm Your Appointment</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Doctor:</Text>
          <Text style={styles.value}>{doctorName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Specialty:</Text>
          <Text style={styles.value}>{specialty}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Selected Slot:</Text>
          <Text style={styles.value}>{selectedSlot}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Consultation Fee:</Text>
          <Text style={styles.price}>{price}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>💳 Confirm & Pay</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Glass effect
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(163, 197, 133, 0.5)",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C5F2D",
    marginBottom: 20,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4F7942",
  },
  value: {
    fontSize: 18,
    color: "#2C5F2D",
    fontWeight: "600",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#557C55",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#3E7C17",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3E7C17",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
