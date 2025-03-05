import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { fetchSpecialities } from "@/utils/details_accessor";
import { useFilters } from "@/context/FiltersContext";
import CategoryList from "@/components/CategoryList";
import FontAwesome6 from "@expo/vector-icons/build/FontAwesome6";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const SpecialitiesScreen: React.FC = () => {
  const [specialities, setSpecialities] = useState([]);
  const { setSelectedFilter, setSelectedFilterName, setFilterType } =
    useFilters();

  useEffect(() => {
    const loadSpecialities = async () => {
      const fetchedSpecialities = await fetchSpecialities();
      setSpecialities(fetchedSpecialities);
    };
    loadSpecialities();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <CategoryList
            type="speciality"
            categories={specialities}
            icon={FontAwesome6}
            iconColor={Colors.Primary}
            showSeeMore={false}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 12, marginTop: 10 },
  scrollContainer: { flexGrow: 1, paddingBottom: 20 }, // Ensures content is scrollable
});

export default SpecialitiesScreen;
