import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, globalStyles } from '../constants/theme';
import { auth } from '../firebaseConfig';

export default function RegisterScreen() 
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) 
    {
      Alert.alert('Error', 'Empty inputs.');
      return;
    }

    if (password.length < 6)
    {
      Alert.alert('Error', 'The password must be 6 or more characters.');
      return;
    }

    setLoading(true);
    try 
    {
      console.log("Προσπάθεια εγγραφής...");
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Εγγραφή επιτυχής! Ανακατεύθυνση...");
      Alert.alert('Success!', 'Account Created.', [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]);
    } 
    catch (error: any) 
    {
      console.error("Σφάλμα εγγραφής:", error.code);
      let errorMessage = 'Κάτι πήγε στραβά.';
      if (error.code === 'auth/email-already-in-use') errorMessage = 'email already in use.';
      if (error.code === 'auth/invalid-email') errorMessage = 'email does not exist.';
      
      Alert.alert('Error', errorMessage);
    } 
    finally 
    {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={globalStyles.title}>New Account</Text>
        
        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          placeholderTextColor={Colors.subtext}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput
          style={globalStyles.input}
          placeholder="Password (6+ characters)"
          placeholderTextColor={Colors.subtext}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          style={globalStyles.primaryButton} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? ( <ActivityIndicator color="#fff" /> ) : ( <Text style={globalStyles.buttonText}>Create Account</Text> )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={globalStyles.linkText}>Already have an account? Sign in!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}