import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

import React, { useState } from "react";
import { common } from "@/constants/Styles";
import { useNavigation } from "@react-navigation/native";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useLocation } from "@/hooks/useLocation";
import { useAuth } from "@/hooks/useAuth";
import { Colors } from "@/constants/Colors";
import SymptomContainer from "@/components/SymptomContainer";
import SpecialityContainer from "@/components/SpecialityContainer";

export default function dashboard() {
  const { locationState } = useLocation();

  const [doctors, setDoctors] = useState([]);

  const loadDoctors = async () => {
    try {
      if (locationState.latitude && locationState.longitude) {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/staff/list?latitude=${locationState.latitude}&longitude=${locationState.longitude}`
        );
        setDoctors(response.data);
      }
    } catch (error) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      loadDoctors();
    }, [locationState.latitude, locationState.longitude])
  );

  return (
    <SafeAreaView style={common.safeArea}>
      <ScrollView style={common.container}>
        <View
          style={{
            backgroundColor: Colors.Primary,
            borderRadius: 5,
            padding: 10,
            marginTop: 10,
          }}
        >
          <Text style={[common.title, { color: Colors.White }]}>Welcome,</Text>
          <Text style={[common.text, { color: Colors.White }]}>
            Sidharth Balakrishnan
          </Text>

          <Text style={[common.text, { color: Colors.White, paddingTop: 20 }]}>
            Your have an upcoming appointment at,
          </Text>
          <Text style={[common.text, { color: Colors.White }]}>
            09:00 on 16 July 2024
          </Text>

          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "flex-end" }}
            onPress={() => router.navigate("/doctor")}
          >
            <Text style={styles.viewBookings}>view bookings</Text>
            <Ionicons
              name="arrow-forward-outline"
              size={24}
              color={Colors.White}
            />
          </TouchableOpacity>
        </View>

        <View>
          <SymptomContainer />
        </View>

        <View style={{ paddingTop: 10 }}>
          <SpecialityContainer />
        </View>

        <View style={{ paddingTop: 10 }}>
          <View
            style={[styles.titleContainer, { justifyContent: "space-between" }]}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <FontAwesome6
                name="map-location-dot"
                size={24}
                color={Colors.Primary}
              />
              <Text style={common.title}>Nearby Doctors</Text>
            </View>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => router.navigate("/doctor")}
            >
              <Text style={styles.viewAll}>more</Text>
              <Ionicons
                name="arrow-forward-outline"
                size={24}
                color={Colors.Primary}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={doctors}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.doctorContainer}
                onPress={() => router.push("/doctor/" + item.id)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.doctorImage}
                />
                <View style={styles.doctorInfo}>
                  <Text style={{ fontFamily: common.defaultText }}>
                    Dr {item.firstName} {item.lastName}
                  </Text>
                  <Text style={common.text}>
                    {item.speciality} • {item.role}
                  </Text>
                  <Text style={common.text}>
                    {item.experience} years experience • ~{item.distance} kms
                  </Text>
                  <Text style={common.text}>Charges ₹ {item.fee}</Text>
                  <View style={{ flexDirection: "row", paddingTop: 10 }}>
                    <FontAwesome6
                      name="calendar-check"
                      size={16}
                      color={Colors.LightGrey}
                      style={{ paddingTop: 1, paddingRight: 5 }}
                    />
                    <Text
                      style={{
                        fontFamily: common.defaultHeading,
                        color: Colors.LightGrey,
                      }}
                    >
                      Available at 09:00 today
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => String(index)}
          />
          <TouchableOpacity>
            <Text style={styles.footer}>view more</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  symptomContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Center align
    gap: 8, // Adds uniform spacing
    paddingHorizontal: 10, // Adds padding from the screen edge
  },
  titleContainer: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  doctorContainer: {
    backgroundColor: Colors.White,
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    flexDirection: "row",
  },
  doctorImage: {
    width: 125,
    height: 125,
    borderRadius: 99,
  },
  doctorInfo: {
    marginTop: 7,
    marginLeft: 10,
    width: 240,
  },
  viewBookings: {
    fontFamily: common.defaultHeading,
    color: Colors.White,
  },
  viewAll: {
    fontFamily: common.defaultHeading,
    color: Colors.Primary,
  },
  footer: {
    fontFamily: common.defaultHeading,
    color: Colors.Primary,
    textAlign: "center",
    marginBottom: 20,
  },
  item: {
    padding: 14,
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedItem: {
    backgroundColor: "#4CAF50", // Green background
    borderColor: "#388E3C", // Darker green border
  },
  itemText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
    fontFamily: common.defaultText,
  },
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  selectedItemText: {
    color: "#FFFFFF", // White text for better visibility
  },
});
