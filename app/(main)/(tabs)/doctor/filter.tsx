import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter, useFocusEffect } from "expo-router";
import { fetchSpecialities } from "@/utils/details_accessor";
import { useFilters } from "@/context/FiltersContext";

const symptoms = ["Chest Pain", "Skin Rash", "Headache", "Back Pain"];

const FilterScreen = () => {
  const router = useRouter();
  const [specializations, setSpecializations] = useState([]);
  const {
    selectedFilter,
    setSelectedFilter,
    selectedFilterName,
    setSelectedFilterName,
    filterType,
    setFilterType,
  } = useFilters();
  const [selectedPrice, setSelectedPrice] = useState("");

  // Load specializations and merge with symptoms
  const loadSpecializations = async () => {
    const fetchedSpecialities = await fetchSpecialities();
    const combinedOptions = [
      { id: "", name: "Any" }, // Default option
      ...fetchedSpecialities.map((item) => ({
        id: item.id,
        name: item.name,
        type: "speciality",
      })), // Specializations
      ...symptoms.map((symptom) => ({
        id: `symptom-${symptom}`,
        name: symptom,
        type: "symptom",
      })), // Symptoms
    ];
    setSpecializations(combinedOptions);
  };

  useFocusEffect(
    useCallback(() => {
      loadSpecializations();
    }, [])
  );

  const applyFilters = () => {
    const isSymptom = filterType === "symptom";
    router.replace({
      pathname: "/doctor",
    });
  };

  const clearFilters = () => {
    setSelectedFilter("");
    setSelectedFilterName("");
    setFilterType("");
    setSelectedPrice("");
    router.replace({
      pathname: "/doctor",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Doctors</Text>

      <Text style={styles.label}>Specialization or Symptom</Text>
      <Picker
        selectedValue={selectedFilter}
        onValueChange={(value) => {
          const selectedOption = specializations.find(
            (item) => String(item.id) === String(value)
          );
          setSelectedFilter(value);
          setSelectedFilterName(selectedOption.name);
          setFilterType(selectedOption?.type || "");
        }}
        style={styles.picker}
      >
        {specializations.map((item) => (
          <Picker.Item key={item.id} label={item.name} value={item.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Price Range</Text>
      <Picker
        selectedValue={selectedPrice}
        onValueChange={setSelectedPrice}
        style={styles.picker}
      >
        <Picker.Item label="Any" value="" />
        <Picker.Item label="$50" value="50" />
        <Picker.Item label="$60" value="60" />
        <Picker.Item label="$70" value="70" />
        <Picker.Item label="$80" value="80" />
        <Picker.Item label="$100" value="100" />
      </Picker>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.buttonText}>Apply Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <Text style={styles.buttonText}>Clear Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  picker: {
    height: 50,
    backgroundColor: "#F0F0F0",
    marginTop: 5,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  applyButton: {
    padding: 12,
    backgroundColor: "#2C5F2D",
    borderRadius: 8,
    alignItems: "center",
  },
  clearButton: {
    padding: 12,
    backgroundColor: "#D9534F",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
