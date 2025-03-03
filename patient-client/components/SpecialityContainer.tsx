import React, { useCallback, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { router, useFocusEffect } from "expo-router"; // Import router
import axios from "axios";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { common } from "@/constants/Styles";
import { fetchSpecialities } from "@/utils/details_accessor";
import { useFilters } from "@/context/FiltersContext";

interface Speciality {
  id: string;
  name: string;
  image: string;
}

interface SpecialityContainerProps {
  specialities: Speciality[];
}

const SpecialityContainer: React.FC<SpecialityContainerProps> = () => {
  const [expanded, setExpanded] = useState(false);
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>(
    null
  );

  const {
    setSelectedFilter,
    setSelectedFilterName,
    setFilterType,
    selectedFilterName,
  } = useFilters();

  const loadSpecialities = async () => {
    const fetchedSpecialities = await fetchSpecialities();
    setSpecialities(fetchedSpecialities);
  };

  useFocusEffect(
    useCallback(() => {
      loadSpecialities();
    }, [])
  );

  const handleSpecialitySelect = (selectedSpeciality) => {
    setSelectedFilter(selectedSpeciality.id);
    // setSelectedFilterName(selectedSpeciality.name);
    setSelectedFilterName(selectedSpeciality.name);
    setFilterType("speciality");

    router.navigate({
      pathname: "/doctor",
      params: {
        specialityId: selectedSpeciality.id,
        specialityName: selectedSpeciality.name,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <FontAwesome6 name="user-doctor" size={24} color={Colors.Primary} />
        <Text style={common.title}>Choose Speciality</Text>
      </View>
      <View style={styles.specialityContainer}>
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
                onPress={() => handleSpecialitySelect(item)}
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
  titleContainer: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  specialityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Center align
    gap: 4, // Adds uniform spacing
    paddingHorizontal: 10, // Adds padding from the screen edge
  },
});

export default SpecialityContainer;
