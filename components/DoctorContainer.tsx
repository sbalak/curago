import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

import React, { useState } from "react";
import { common } from "@/constants/Styles";
import { useLocation } from "@/hooks/useLocation";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";

const DoctorContainer = ({ doctors }) => {
  return (
    <View>
      <FlatList
        data={doctors}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.doctorContainer}
            onPress={() => router.push("/doctor/" + item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.doctorImage} />
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
  );
};

const styles = StyleSheet.create({
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

export default DoctorContainer;
