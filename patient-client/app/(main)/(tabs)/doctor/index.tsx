import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import ConsultNowButtonContainer from "@/components/ConsultNowButtonContainer";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFilters } from "@/context/FiltersContext";

// Sample doctors data
const doctors = [
  {
    id: 1,
    name: "Dr. Smith",
    specialty: "Cardiology",
    price: "50",
    slots: ["10:00 AM", "2:00 PM", "5:00 PM"],
  },
  {
    id: 2,
    name: "Dr. Johnson",
    specialty: "Dermatology",
    price: "40",
    slots: ["11:00 AM", "3:00 PM", "6:00 PM"],
  },
  {
    id: 3,
    name: "Dr. Patel",
    specialty: "Neurology",
    price: "70",
    slots: ["9:00 AM", "1:00 PM", "4:00 PM"],
  },
];

// DoctorScreen Component
const DoctorScreen = () => {
  // Retrieve filter params from the URL
  // const { specialty, symptom, price } = useLocalSearchParams() || {};
  const { selectedFilter, selectedFilterName, filterType } = useFilters();

  console.log("l", selectedFilterName);
  console.log("h", filterType);

  // Function to filter doctors based on selected filters
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      !selectedFilterName || doctor.specialty === selectedFilterName
      // && (!price || doctor.price === price)
    );
  });

  const handleDoctorSelection = (doctor) => {
    router.navigate({ pathname: "/doctor/" + doctor.id });
  };

  return (
    <View style={styles.container}>
      {/* Header with Filter Button & Selected Filters */}
      <View style={styles.header}>
        {/* Filter Button on the Left */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => router.push("/(main)/(tabs)/doctor/filter")}
        >
          <FontAwesome5 name="filter" size={14} color="white" />
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>

        {/* Selected Filters on the Right */}
        <View style={styles.selectedFilters}>
          {filterType === "specialty" && (
            <Text style={styles.filterTag}>
              Specialty: {selectedFilterName}
            </Text>
          )}
          {filterType === "symptom" && (
            <Text style={styles.filterTag}>Symptom: {selectedFilterName}</Text>
          )}
          {/* {price && <Text style={styles.filterTag}>Price: ${price}</Text>} */}
          {/* {!filterType && !price && ( */}
          {!filterType && (
            <Text style={styles.noFilterText}>No filters applied</Text>
          )}
        </View>
      </View>

      {/* Doctor List */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.specialty}>{item.specialty}</Text>
            <Text style={styles.price}>${item.price}</Text>

            <View style={styles.slotsContainer}>
              {item.slots.map((slot, index) => (
                <View key={index} style={styles.slot}>
                  <Text style={styles.slotText}>{slot}</Text>
                </View>
              ))}
            </View>

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
    backgroundColor: "#F3F8FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Filters on the left, selected filters on the right
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#2980B9",
    borderRadius: 6,
    shadowColor: "#2980B9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 6,
  },
  selectedFilters: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  filterTag: {
    backgroundColor: "#E1F5FE",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginHorizontal: 4,
    fontSize: 14,
    color: "#007BB5",
  },
  noFilterText: {
    fontSize: 14,
    color: "#7D8A99",
  },
  card: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(200, 220, 255, 0.6)",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  specialty: {
    fontSize: 16,
    color: "#7F8C8D",
    marginTop: 5,
  },
  price: {
    fontSize: 18,
    color: "#27AE60",
    marginTop: 5,
    fontWeight: "600",
  },
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  slot: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#56CCF2",
    margin: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#56CCF2",
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
