import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";

interface Speciality {
  id: string;
  name: string;
  image: string;
}

interface SpecialityContainerProps {
  specialities: Speciality[];
}

const SpecialityContainer: React.FC<SpecialityContainerProps> = ({
  specialities,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>(
    null
  );

  const handleSpecialitySelect = (id: string) => {
    const newSelection = id === selectedSpeciality ? null : id;
    setSelectedSpeciality(newSelection);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expanded ? specialities : specialities.slice(0, 6)}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ gap: 8, justifyContent: "space-between" }}
        renderItem={({ item }) => {
          const isSelected = selectedSpeciality === item.id;
          return (
            <TouchableOpacity
              style={[styles.item, isSelected && styles.selectedItem]}
              onPress={() => handleSpecialitySelect(item.id)}
            >
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.image }} />
              </View>
              <Text style={[styles.text, isSelected && styles.selectedText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Show More Button */}
      {specialities.length > 6 && (
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
    borderRadius: 15,
    backgroundColor: Colors.White,
    padding: 10,
    width: 100,
    alignItems: "center",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedItem: {
    backgroundColor: "#4CAF50",
    borderColor: "#388E3C",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
  },
  text: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
  },
  selectedText: {
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

export default SpecialityContainer;
