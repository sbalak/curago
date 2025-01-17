import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { common } from '@/constants/Styles';
import axios from 'axios';

export default function index() {
  const { authState, logout } = useAuth();
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Settings' });
  }, []);
  
  const loadUser = async() => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/staff/details?staffId=${authState.userId}`);
      setUser(response.data);
    }
    catch(error) {
    } 
  }
  const handleLogout = async () => {
    try {
      await logout();
    }
    catch (error) {
    }
  }
  
    useFocusEffect(
      React.useCallback(() => {
        loadUser();
      }, [])
    );

  return (
    <SafeAreaView style={common.safeArea}>
      <ScrollView style={common.container}>
        <View style={styles.titleContainer}>
            <Text style={common.title}>Your Profile</Text>
        </View>
        <View style={profile.container}>
          <Ionicons name="person-circle" size={80} color={Colors.Primary}/> 
          <View style={profile.info}>
              <Text style={[common.defaultHeading, profile.title]}>
                {
                  (!user.firstName || !user.lastName) ? (
                    user.phone
                  ) : (
                    user.firstName + ' ' + user.lastName
                  )
                }
              </Text>
              <Text style={common.text} onPress={() => router.navigate("/settings/profile")}>Edit Profile</Text>
          </View>        
        </View>
        <View style={{ marginVertical: 10, backgroundColor: '#fff', borderRadius: 10 }}>
          <TouchableOpacity style={{ padding: 10, marginVertical:10, gap: 15, flexDirection: 'row' }} onPress={() => router.navigate('/order')}>
            <Ionicons name="briefcase-outline" size={20} color={Colors.LightGrey} />
            <Text style={common.text}>Orders</Text>
          </TouchableOpacity>        
          <View style={styles.divider}></View>
          <TouchableOpacity style={{ padding: 10, marginVertical:10, gap: 15, flexDirection: 'row' }} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={Colors.LightGrey} />
            <Text style={common.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10
  },
  divider: {
      height:1,
      backgroundColor: Colors.LighterGrey, 
  }
})

const profile = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row'
  },
  info: {
      marginTop: 15,
      marginLeft: 10
  },
  title: {
      fontSize: 18
  }
})