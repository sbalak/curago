import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { common } from "@/constants/Styles";
import { useFilters } from "@/context/FiltersContext";
import { router } from "expo-router";

interface Speciality {
  id: string;
  name: string;
  image: string;
}

interface SpecialityListProps {
  specialities: Speciality[];
  showSeeMore?: boolean;
  onSeeMorePress?: () => void;
}

const SpecialityList: React.FC<SpecialityListProps> = ({
  specialities,
  showSeeMore = false,
  onSeeMorePress,
}) => {
  const { setSelectedFilter, setSelectedFilterName, setFilterType } =
    useFilters();

  const handleSpecialitySelect = (selectedSpeciality: Speciality) => {
    setSelectedFilter(selectedSpeciality.id);
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
    <View>
      <View style={styles.titleContainer}>
        <FontAwesome6 name="user-doctor" size={24} color={Colors.Primary} />
        <Text style={common.title}>Choose Speciality</Text>
      </View>

      <FlatList
        data={specialities}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ gap: 8, justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleSpecialitySelect(item)}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {showSeeMore && (
        <TouchableOpacity
          onPress={onSeeMorePress}
          style={styles.showMoreButton}
        >
          <Text style={styles.showMoreText}>See More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  //   item: {
  //     borderRadius: 15,
  //     backgroundColor: Colors.White,
  //     padding: 10,
  //     width: 100,
  //     alignItems: "center",
  //     marginVertical: 5,
  //     borderWidth: 1,
  //     borderColor: "#ccc",
  //   },
  //   imageContainer: { alignItems: "center" },
  //   image: { height: 50, width: 50 },
  //   text: {
  //     textAlign: "center",
  //     marginTop: 10,
  //     fontSize: 12,
  //     fontWeight: "500",
  //     color: "#333",
  //   },
  showMoreButton: { alignItems: "center", marginTop: 8 },
  showMoreText: { fontSize: 14, fontWeight: "bold", color: "#007BFF" },
  titleContainer: { marginVertical: 10, flexDirection: "row", gap: 5 },
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 12, // Adds space on the left and right
  },
  columnWrapper: {
    gap: 6, // Less spacing between items
    justifyContent: "space-evenly",
  },
  item: {
    flex: 1,
    maxWidth: 110, // Ensures proper spacing
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: Colors.White,
    padding: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 4, // Ensures text sits right below image
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
  },
});

export default SpecialityList;
