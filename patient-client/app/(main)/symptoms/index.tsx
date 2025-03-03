import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import SymptomList from "@/components/CategoryList";
import CategoryList from "@/components/CategoryList";
import { Colors } from "@/constants/Colors";
import { useFilters } from "@/context/FiltersContext";
import FontAwesome6 from "@expo/vector-icons/build/FontAwesome6";

const SymptomScreen: React.FC = () => {
  const [symptoms, setSymptoms] = useState([]);
  const { setSelectedFilter, setSelectedFilterName, setFilterType } =
    useFilters();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadSymptoms = async () => {
        try {
          const response = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/reference/symptoms`
          );
          setSymptoms(response.data);
        } catch (error) {
          console.error("Error fetching symptoms", error);
        }
      };
      loadSymptoms();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CategoryList
          type="symptom"
          categories={symptoms}
          icon={FontAwesome6}
          iconColor={Colors.Primary}
          showSeeMore={false}
          onSeeMorePress={() => router.navigate("/symptoms")}
          onSelect={(selectedSymptom: { id: any; name: any }) => {
            setSelectedFilter(selectedSymptom.id);
            setSelectedFilterName(selectedSymptom.name);
            setFilterType("symptom");
            router.navigate({
              pathname: "/doctor",
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default SymptomScreen;
