import React, { useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useFocusEffect } from "expo-router";
import { fetchSymptoms } from "@/utils/details_accessor";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFilters } from "@/context/FiltersContext";
import { Colors } from "@/constants/Colors";
import CategoryList from "@/components/CategoryList";

const SymptomContainer: React.FC = () => {
  const [symptoms, setSymptoms] = useState([]);
  const { setSelectedFilter, setSelectedFilterName, setFilterType } =
    useFilters();

  useFocusEffect(
    useCallback(() => {
      const loadsymptoms = async () => {
        const fetchedsymptoms = await fetchSymptoms();
        setSymptoms(fetchedsymptoms);
      };
      loadsymptoms();
    }, [])
  );

  return (
    <View style={styles.container}>
      <CategoryList
        type="symptom"
        categories={symptoms.slice(0, 6)}
        icon={FontAwesome6}
        iconColor={Colors.Primary}
        showSeeMore={symptoms.length > 6}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, marginTop: 10 },
});

export default SymptomContainer;
