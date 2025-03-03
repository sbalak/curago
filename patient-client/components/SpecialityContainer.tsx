import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { fetchSpecialities } from "@/utils/details_accessor";
import CategoryList from "./CategoryList";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useFilters } from "@/context/FiltersContext";
import { router } from "expo-router";

const SpecialityContainer: React.FC = () => {
  const [specialities, setSpecialities] = useState([]);
  const { setSelectedFilter, setSelectedFilterName, setFilterType } =
    useFilters();
  // const [expanded, setExpanded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadSpecialities = async () => {
        const fetchedSpecialities = await fetchSpecialities();
        setSpecialities(fetchedSpecialities);
      };
      loadSpecialities();
    }, [])
  );

  return (
    <View style={styles.container}>
      <CategoryList
        type="speciality"
        categories={specialities.slice(0, 6)}
        icon={FontAwesome6}
        iconColor={Colors.Primary}
        showSeeMore={specialities.length > 6}
        onSeeMorePress={() => router.navigate("/specialities")}
        onSelect={(selectedSpeciality) => {
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
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, marginTop: 10 },
});

export default SpecialityContainer;
