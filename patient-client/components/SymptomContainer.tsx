import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";

const SymptomContainer = ({ symptoms }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // Track selected symptoms (multiple)

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

      {/* Show More Button */}
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
    alignItems: "center",
    marginTop: 8,
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007BFF",
  },
});

export default SymptomContainer;
