import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { fetchSpecialities } from "@/utils/details_accessor";
import SpecialityList from "@/components/SpecialityList";
import { router } from "expo-router";

const SpecialityContainer: React.FC = () => {
  const [specialities, setSpecialities] = useState([]);
  const [expanded, setExpanded] = useState(false);

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
      <SpecialityList
        specialities={expanded ? specialities : specialities.slice(0, 6)}
        showSeeMore={specialities.length > 6}
        onSeeMorePress={() => router.navigate("/specialities")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, marginTop: 10 },
});

export default SpecialityContainer;
