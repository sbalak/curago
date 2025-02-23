import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import { useLocation } from '@/hooks/useLocation';
import axios from 'axios';
import { common } from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';

export default function DoctorDetails() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const { locationState } = useLocation();
    const [doctor, setDoctor] = useState([]);
    const [dates, setDates] = useState([]);
    const [amSlots, setAmSlots] = useState([]);
    const [pmSlots, setPmSlots] = useState([]);


    const loadDates = async() => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/appointment/dates`);
            setDates(response.data);
        }
        catch(error) {
        } 
    }
    
    const loadAvailabilities = async(date: string) => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/appointment/availability?staffId=${id}&date=${date}`);
            setAmSlots(response.data[0].appointments);
            setPmSlots(response.data[1].appointments);
        }
        catch(error) {
        } 
    }

    const loadDoctor = async() => {
      try {
        if (locationState.latitude && locationState.longitude) {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/staff/details?staffId=${id}&latitude=${locationState.latitude}&longitude=${locationState.longitude}`);
            setDoctor(response.data);
        }
      }
      catch(error) {
      } 
    }

    useEffect(() => {
      navigation.setOptions({ headerTitle: 'Doctor Details' });
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loadDoctor();
            loadDates();
            loadAvailabilities('2025-02-23');
        }, [])
    );

    return (    
        <SafeAreaView style={common.safeArea}>
            <ScrollView style={common.container}>
                <View style={styles.doctorContainer}>
                    <Image source={{uri:doctor.image}} style={styles.doctorImage} />
                    <View style={styles.doctorInfo}>
                        <Text style={{fontFamily: common.defaultText}}>Dr {doctor.firstName} {doctor.lastName}</Text>
                        <Text style={common.text}>{doctor.speciality} • {doctor.role}</Text>
                        <Text style={common.text}>{doctor.experience} years experience • ~{doctor.distance} kms</Text>
                        <Text style={common.text}>Charges ₹ {doctor.fee}</Text>
                        <View style={{flexDirection: 'row', paddingTop: 10}}>
                            <FontAwesome6 name="calendar-check" size={16} color={Colors.LightGrey} style={{paddingTop: 1, paddingRight: 5}} />
                            <Text style={{fontFamily: common.defaultHeading, color: Colors.LightGrey}}>Available at 09:00 today</Text>
                        </View>
                    </View>
                </View>

                <View style={{paddingTop:10}}>
                    <View style={styles.titleContainer}>
                        <FontAwesome6 name="calendar-plus" size={24} color={Colors.Primary} />
                        <Text style={common.title}>Book your Slot</Text>
                    </View>
                    <FlatList data={dates} 
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false} 
                        renderItem={({item, index})=>(
                            <TouchableOpacity style={{backgroundColor: Colors.White, padding: 15, borderRadius:10, marginVertical: 10, marginRight: 10}} onPress={() => { loadAvailabilities('2025-02-23') }}>
                                <Text style={{fontFamily:common.defaultHeading, fontSize: 18, textAlign: 'center'}}>{item.date}</Text>
                                <Text style={{fontFamily:common.defaultText, fontSize: 12, textAlign: 'center'}}>{item.day}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => String(index)}
                    />
                </View>

                <View style={{ paddingTop:20}}>
                    <View style={styles.titleContainer}>
                        <Ionicons name="sunny" size={24} color={Colors.Primary} />
                        <Text style={common.title}>AM Slots</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', paddingTop:10}}>
                    {
                        amSlots.length > 0 ? (
                            amSlots.map((item, index) => (
                                <Text style={{color: Colors.White, borderRadius: 10, fontFamily: common.defaultText, padding:15, backgroundColor: Colors.Primary, marginRight: 10 }} key={index}>{item.start}</Text> 
                            ))
                        ) : 
                        (
                            <Text>No slots available</Text>
                        )
                    }
                    </View>
                </View>

                <View style={{ paddingTop:20}}>
                    <View style={styles.titleContainer}>
                        <Ionicons name="moon" size={24} color={Colors.Primary} />
                        <Text style={common.title}>PM Slots</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', paddingTop:10}}>
                    {
                        pmSlots.length > 0 ? (
                            pmSlots.map((item, index) => (
                                <Text style={{color: Colors.White, borderRadius: 10, fontFamily: common.defaultText, padding:15, backgroundColor: Colors.Primary, marginRight: 10 }} key={index}>{item.start}</Text> 
                            ))
                        ) : 
                        (
                            <Text>No slots available</Text>
                        )
                    }
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
      display: 'flex',
      flexDirection: 'row', gap: 5
    },
    doctorContainer: {
        backgroundColor: Colors.White,
        marginTop: 10,
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
    }
});