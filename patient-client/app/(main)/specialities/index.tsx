import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { fetchSpecialities } from "@/utils/details_accessor";
import SpecialityList from "@/components/SpecialityList";

const SpecialitiesScreen: React.FC = () => {
  const [specialities, setSpecialities] = useState([]);

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
        <SpecialityList specialities={specialities} onSelect={() => {}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 12, marginTop: 10 },
  scrollContainer: { flexGrow: 1, paddingBottom: 20 }, // Ensures content is scrollable
});

export default SpecialitiesScreen;
