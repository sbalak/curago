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
import axios from 'axios';
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useLocation } from "@/hooks/useLocation";
import { useAuth } from "@/hooks/useAuth";
import { Colors } from "@/constants/Colors";
{/*
const specialties = ["Cardiology", "Dermatology", "Neurology", "Pediatrics"];
const symptoms = ["Headache", "Skin Rash", "Chest Pain", "Fever"];
*/}
export default function dashboard() {
  const { locationState } = useLocation();
  const [specialities, setSpecialities] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const loadSpecialities = async() => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/reference/specialities`);
      console.log(response.data);
      setSpecialities(response.data);
    }
    catch(error) {
    } 
  }

  const loadSymptoms = async() => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/reference/symptoms`);
      setSymptoms(response.data);
    }
    catch(error) {
    } 
  }

  const loadDoctors = async() => {
    try {
      if (locationState.latitude && locationState.longitude) {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/staff/list?latitude=${locationState.latitude}&longitude=${locationState.longitude}`);
        setDoctors(response.data);
      }
    }
    catch(error) {
    } 
  }

{/*  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category (Symptoms or Specialty)
  const [selectedSpecialty, setSelectedSpecialty] = useState(null); // Track selected specialty (only one)
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // Track selected symptoms (multiple)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSpecialty(null); // Reset selected specialty when category is changed
    setSelectedSymptoms([]); // Reset symptoms when category is changed
  };

  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty); // Only one specialty can be selected
  };

  const handleSymptomSelect = (symptom) => {
    setSelectedSymptoms((prevSelectedSymptoms) => {
      // Toggle symptom selection
      if (prevSelectedSymptoms.includes(symptom)) {
        return prevSelectedSymptoms.filter(
          (selectedSymptom) => selectedSymptom !== symptom
        );
      } else {
        return [...prevSelectedSymptoms, symptom];
      }
    });
  };

  const handleNext = () => {
    if (selectedSpecialty || selectedSymptoms.length > 0) {
      router.push({
        pathname: "/doctor",
        params: {
          selectedSpecialty: selectedSpecialty,
          selectedSymptoms: selectedSymptoms,
        },
      });

      // navigation.navigate("doctor", {
      //   selectedSpecialty,
      //   selectedSymptoms,
      // });
    }
  };

  const renderCategoryButtons = () => {
    return (
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Specialties" && styles.selectedCategoryButton,
          ]}
          onPress={() => handleCategorySelect("Specialties")}
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === "Specialties" &&
                styles.selectedCategoryButtonText,
            ]}
          >
            Specialties
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Symptoms" && styles.selectedCategoryButton,
          ]}
          onPress={() => handleCategorySelect("Symptoms")}
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === "Symptoms" &&
                styles.selectedCategoryButtonText,
            ]}
          >
            Symptoms
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}
  const renderItems = () => {
    const data = selectedCategory === "Specialties" ? specialties : symptoms;

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selectedSpecialty === item &&
                selectedCategory === "Specialties" &&
                styles.selectedItem,
              selectedSymptoms.includes(item) &&
                selectedCategory === "Symptoms" &&
                styles.selectedItem,
            ]}
            onPress={() => {
              if (selectedCategory === "Specialties") {
                handleSpecialtySelect(item);
              } else {
                handleSymptomSelect(item);
              }
            }}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };*/}

  
  useFocusEffect(
    React.useCallback(() => {
      loadDoctors();
      loadSpecialities();
      loadSymptoms();
    }, [locationState.latitude, locationState.longitude])
  );

  return (
    <SafeAreaView style={common.safeArea}>
      <ScrollView style={common.container}>
        
        <View style={{backgroundColor: Colors.Primary, borderRadius:5, padding:10, marginTop: 10}}>
          <Text style={[common.title, {color: Colors.White}]}>Welcome,</Text>
          <Text style={[common.text, {color: Colors.White}]}>Sidharth Balakrishnan</Text>
          
          <Text style={[common.text, {color: Colors.White, paddingTop:20}]}>Your have an upcoming appointment at,</Text>
          <Text style={[common.text, {color: Colors.White}]}>09:00 on 16 July 2024</Text>
          
          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end'}} onPress={() => (router.navigate('/doctor'))}>
            <Text style={styles.viewBookings}>view bookings</Text>
            <Ionicons name="arrow-forward-outline" size={24} color={Colors.White} />
          </TouchableOpacity>

        </View>

        <View>
          <View style={styles.titleContainer}>
            <Ionicons name="medical" size={24} color="#FFB300" />
            <Text style={common.title}>What's your Symptom?</Text>
          </View>
          <FlatList data={symptoms} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            renderItem={({item, index})=>(
              <TouchableOpacity style={{borderRadius: 15, backgroundColor: Colors.White, padding: 10, marginRight: 5}}>
                <Text style={{fontFamily: common.defaultText}}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
        
        <View style={{paddingTop:10}}>
          <View style={styles.titleContainer}>
            <FontAwesome6 name="user-doctor" size={24} color={Colors.Primary} />
            <Text style={common.title}>Choose Speciality</Text>
          </View>
          <FlatList data={specialities} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            renderItem={({item, index})=>(
              <TouchableOpacity style={{borderRadius: 15, backgroundColor: Colors.White, padding: 10, width:100, marginRight: 5}}>
                <View style={{alignItems: 'center'}}><Image style={{height:50, width: 50}} source={{uri:item.image}} /></View>
                <Text style={{textAlign: 'center', marginTop:10, fontFamily: common.defaultText, fontSize: 12}}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
        
        <View style={{paddingTop:10}}>
          <View style={[styles.titleContainer, {justifyContent: 'space-between'}]}>
            <View style={{flexDirection: 'row', gap: 5}}>
              <FontAwesome6 name="map-location-dot" size={24} color={Colors.Primary} />
              <Text style={common.title}>Nearby Doctors</Text>
            </View>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => (router.navigate('/doctor'))}>
              <Text style={styles.viewAll}>more</Text>
              <Ionicons name="arrow-forward-outline" size={24} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
          <FlatList data={doctors} 
            scrollEnabled={false} 
            renderItem={({item, index})=>(
              <TouchableOpacity style={styles.doctorContainer} onPress={() => router.push('/doctor/'+item.id)}>
                <Image source={{uri:item.image}} style={styles.doctorImage} />
                <View style={styles.doctorInfo}>
                    <Text style={{fontFamily: common.defaultText}}>Dr {item.firstName} {item.lastName}</Text>
                    <Text style={common.text}>{item.speciality} • {item.role}</Text>
                    <Text style={common.text}>{item.experience} years experience • ~{item.distance} kms</Text>
                    <Text style={common.text}>Charges ₹ {item.fee}</Text>
                    <View style={{flexDirection: 'row', paddingTop: 10}}>
                      <FontAwesome6 name="calendar-check" size={16} color={Colors.LightGrey} style={{paddingTop: 1, paddingRight: 5}} />
                      <Text style={{fontFamily: common.defaultHeading, color: Colors.LightGrey}}>Available at 09:00 today</Text>
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
  titleContainer: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row', gap: 5
  },
  doctorContainer: {
      backgroundColor: Colors.White,
      marginBottom: 10,
      padding: 10,
      borderRadius: 15,
      flexDirection: 'row',
  },
  doctorImage: {
      width: 125,
      height: 125,
      borderRadius:99
  },
  doctorInfo: {
      marginTop: 7,
      marginLeft: 10,
      width:240,
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
    marginBottom:20
  }
});

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f7f8fa",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    width: "100%",
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#007BFF",
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  selectedCategoryButton: {
    backgroundColor: "#007BFF",
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007BFF",
  },
  selectedCategoryButtonText: {
    color: "#fff",
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
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
  },
});
*/