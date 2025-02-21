import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth';
import { Link, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { common } from '@/constants/Styles';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validPhone, setValidPhone] = useState(false);
  const { login } = useAuth();
  const { top } = useSafeAreaInsets();

  const handleLogin = async () => {
    try {
      if (!username || username.length < 10) {
        Alert.alert('Error!', "Please enter your phone number");
      }
      else{
        const result = await login(username);
        router.navigate('/verify?username='+username);
        if (result && result.status === 401) {
          Alert.alert('Error!', "Unauthorized, please check your username and password.");
        }
      }      
    } catch (error) {
      Alert.alert('Error!', "Something went wrong, please try again later.");
    }
  }

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={brand.container}>
      <Image style={{height:100,width:300}} source={require('@/assets/images/logo.jpeg')} />
      </View>
      <View style={signin.container}>
        <Text style={signin.title}>Your go to portal for all your health care needs</Text>
        <View style={signin.subTitleContainer}>
          <View style={signin.subTitleDivider} />
          <View>
            <Text style={signin.subTitleText}>Log in or sign up</Text>
          </View>
          <View style={signin.subTitleDivider} />
        </View>
        <View style={signin.inputSection}>
          <View style={signin.countryInput}>  
            <Image style={signin.countryInputImage} source={require('@/assets/images/flag.png')} />
          </View>
          <View style={signin.textInput}>
            <TextInput style={signin.textInputBox}
                       keyboardType="numeric" 
                       placeholderTextColor={Colors.LighterGrey} 
                       placeholder='9999999999' 
                       value={username} 
                       onChangeText={(text: string) => {
                          const regex = new RegExp(/^[123456789]\d{9}$/);
                          const isValid = regex.test(text);

                          if (text.includes('.') || text.includes(',')) {
                            text = text.replace('.', '');
                            text = text.replace(',', '');
                          }

                          if (text.length > 10) {
                            return;
                          }

                          if(isValid){
                            setUsername(text);
                            if (text.length === 10 && isValid){
                              setValidPhone(true);
                            }
                          } else{
                            setUsername(text);
                            setValidPhone(false);
                          }
                       }}
            />
          </View>
        </View>         
      </View>
      <View style={logon.container}>
        <TouchableOpacity style={logon.button} onPress={handleLogin}>
          <Ionicons name="log-in-outline" size={24} color={Colors.White} /> 
          <Text style={[logon.buttonText]}>Continue with OTP</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10 }}>
        <Text style={[common.text, {fontSize: 12}]}>By continuing, you agree to our</Text>
        <Text style={[common.text, {fontSize: 12,textDecorationLine: 'underline'}]}>Terms & Conditions</Text>
      </View>
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: Colors.White,
  },
});

const brand = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 50
  }
});

const signin = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    padding: 10
  },
  title: {
    fontFamily: common.defaultTitle, 
    fontSize: 24,
    textAlign: 'center', 
    marginVertical: 25,
  },
  subTitleContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingBottom: 20
  },
  subTitleText: {
    width: 140, 
    textAlign: 'center', 
    fontFamily: common.defaultTitle,
    color: Colors.LightGrey
  },
  subTitleDivider: {
    flex: 1, 
    height: 1, 
    backgroundColor: Colors.LightGrey
  },
  inputSection: {
    display: 'flex',
    flexDirection: 'row', 
    marginBottom: 10
  },
  countryInput: {
    width: "15%",
    borderColor: Colors.LightGrey, 
    borderWidth: 1, 
    borderRadius: 10,
    marginRight: 19
  },
  countryInputImage: {
    height:30, 
    width: 41,
    marginTop:9, 
    marginLeft: 7, 
    borderRadius: 5
  },
  textInput: {
    width: "80%", 
    height: 50, 
    borderColor: Colors.LightGrey, 
    borderWidth: 1, 
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  textInputBox: {
    width: "100%",
    fontSize: 22
  },
}) 

const logon = StyleSheet.create({
  container: {
    paddingHorizontal:10
  },
  button: {
    marginBottom: 20,
    height: 50,
    width: "100%",
    borderRadius: 10,
    backgroundColor: Colors.Black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: common.defaultText,
    color: Colors.White,
    fontSize: 18,
    marginLeft: 10
  }
});