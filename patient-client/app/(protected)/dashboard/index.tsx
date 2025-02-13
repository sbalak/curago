import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import React, { useState } from "react";
import { common } from "@/constants/Styles";
import { useNavigation } from "@react-navigation/native";

const specialties = ["Cardiology", "Dermatology", "Neurology", "Pediatrics"];
const symptoms = ["Headache", "Skin Rash", "Chest Pain", "Fever"];

export default function dashboard() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category (Symptoms or Specialty)
  const [selectedSpecialty, setSelectedSpecialty] = useState(null); // Track selected specialty (only one)
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // Track selected symptoms (multiple)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSpecialty(null); // Reset selected specialty when category is changed
    setSelectedSymptoms([]); // Reset symptoms when category is changed
  };

  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty); // Only one specialty can be selected
  };

  const handleSymptomSelect = (symptom) => {
    setSelectedSymptoms((prevSelectedSymptoms) => {
      // Toggle symptom selection
      if (prevSelectedSymptoms.includes(symptom)) {
        return prevSelectedSymptoms.filter(
          (selectedSymptom) => selectedSymptom !== symptom
        );
      } else {
        return [...prevSelectedSymptoms, symptom];
      }
    });
  };

  const handleNext = () => {
    if (selectedSpecialty || selectedSymptoms.length > 0) {
      navigation.navigate("Doctors", { selectedSpecialty, selectedSymptoms });
    }
  };

  const renderCategoryButtons = () => {
    return (
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Specialties" && styles.selectedCategoryButton,
          ]}
          onPress={() => handleCategorySelect("Specialties")}
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === "Specialties" &&
                styles.selectedCategoryButtonText,
            ]}
          >
            Specialties
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Symptoms" && styles.selectedCategoryButton,
          ]}
          onPress={() => handleCategorySelect("Symptoms")}
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === "Symptoms" &&
                styles.selectedCategoryButtonText,
            ]}
          >
            Symptoms
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItems = () => {
    const data = selectedCategory === "Specialties" ? specialties : symptoms;

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selectedSpecialty === item &&
                selectedCategory === "Specialties" &&
                styles.selectedItem,
              selectedSymptoms.includes(item) &&
                selectedCategory === "Symptoms" &&
                styles.selectedItem,
            ]}
            onPress={() => {
              if (selectedCategory === "Specialties") {
                handleSpecialtySelect(item);
              } else {
                handleSymptomSelect(item);
              }
            }}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={common.safeArea}>
      <ScrollView style={common.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Choose Symptoms or Specialty</Text>

          {!selectedCategory ? (
            renderCategoryButtons() // Show category buttons if no category is selected
          ) : (
            <>
              <Text style={styles.subtitle}>Select a {selectedCategory}</Text>
              {renderItems()}{" "}
              {/* Show the list of items (specialties or symptoms) based on selection */}
            </>
          )}
          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedSpecialty || selectedSymptoms.length > 0
                ? {}
                : styles.disabledButton,
            ]}
            onPress={handleNext}
            disabled={!selectedSpecialty && selectedSymptoms.length === 0}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f7f8fa",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    width: "100%",
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#007BFF",
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  selectedCategoryButton: {
    backgroundColor: "#007BFF",
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007BFF",
  },
  selectedCategoryButtonText: {
    color: "#fff",
  },
  item: {
    padding: 14,
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedItem: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
  },
});
