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
import { common } from "@/constants/Styles";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

interface Category {
  id: string;
  name: string;
  image?: string; // Optional, since symptoms may not have images
}

interface CategoryListProps {
  type: "speciality" | "symptom";
  categories: Category[];
  icon: React.ComponentType<IconProps>; // Icon component passed as a prop
  iconColor?: string; // Optional color for the icon
  showSeeMore?: boolean;
  onSeeMorePress?: () => void;
  onSelect: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  type,
  categories,
  icon: IconComponent,
  iconColor = Colors.Primary,
  showSeeMore = false,
  onSeeMorePress,
  onSelect,
}) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <IconComponent
          name={type === "speciality" ? "user-doctor" : "asterisk"}
          size={24}
          color={iconColor}
        />
        <Text style={common.title}>
          {type === "speciality"
            ? "Choose Speciality"
            : "Common Health Concerns"}
        </Text>
      </View>

      <FlatList
        data={categories}
        numColumns={3}
        scrollEnabled={false} 
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ gap: 8, justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
            <View style={styles.imageContainer}>
              {item.image ? (
                <Image style={styles.image} source={{ uri: item.image }} />
              ) : (
                <IconComponent name="image" size={50} color="#ccc" />
              )}
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

export default CategoryList;
