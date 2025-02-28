import React, { useCallback, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { common } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import ConsultNowButtonContainer from "@/components/ConsultNowButtonContainer";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router"; // Import router
import axios from "axios";

const SymptomContainer = () => {
  const [expanded, setExpanded] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const loadSymptoms = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/reference/symptoms`
      );
      setSymptoms(response.data);
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      loadSymptoms();
    }, [])
  );

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

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons name="medical" size={24} color="#FFB300" />
        <Text style={common.title}>
          Common Health Concerns
          {/* See More Button (Aligned Right) */}
          {symptoms.length > 6 && (
            <TouchableOpacity
              onPress={() => setExpanded(!expanded)}
              style={styles.showMoreButton}
            >
              <Text style={styles.showMoreText}>
                {expanded ? "Show Less" : "See More"}
              </Text>
            </TouchableOpacity>
          )}
        </Text>
        {/* Subtitle (New Line) */}
        <Text style={common.subTitle}>
          Consult a doctor for any health concern
        </Text>
      </View>

      <View style={styles.symptomContainer}>
        <FlatList
          data={expanded ? symptoms : symptoms.slice(0, 6)}
          numColumns={3}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={{ gap: 8, justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.item,
                selectedSymptoms.includes(item.id) && styles.selectedItem,
              ]}
              onPress={() => handleSymptomSelect(item.id)}
            >
              <Text
                style={[
                  styles.itemText,
                  selectedSymptoms.includes(item.id) && styles.selectedItemText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Consult Now Button */}
        <View style={{ marginTop: 16 }}>
          <ConsultNowButtonContainer />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 10,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    // backgroundColor: "#fff",
    marginVertical: 4,
    minWidth: 80,
    borderRadius: 15,
    backgroundColor: Colors.White,
    padding: 10,
    marginRight: 5,
  },
  selectedItem: {
    backgroundColor: "#4CAF50",
    borderColor: "#388E3C",
  },
  itemText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
  selectedItemText: {
    color: "#fff",
  },
  showMoreButton: {
    position: "absolute", // Position it independently
    right: 0, // Align it to the extreme right
    top: 8, // Align it at the top of the container
  },

  showMoreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007BFF",
  },
  symptomContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Center align
    gap: 8, // Adds uniform spacing
    paddingHorizontal: 10, // Adds padding from the screen edge
  },
});

export default SymptomContainer;
