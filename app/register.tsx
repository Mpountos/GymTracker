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
      Alert.alert('Σφάλμα', 'Παρακαλώ συμπληρώστε όλα τα πεδία.');
      return;
    }

    if (password.length < 6)
    {
      Alert.alert('Σφάλμα', 'Ο κωδικός πρέπει να είναι τουλάχιστον 6 χαρακτήρες.');
      return;
    }

    setLoading(true);
    try 
    {
      console.log("Προσπάθεια εγγραφής...");
      await createUserWithEmailAndPassword(auth, email, password);
      
      console.log("✅ Εγγραφή επιτυχής! Ανακατεύθυνση...");
      
      Alert.alert('Επιτυχία!', 'Ο λογαριασμός δημιουργήθηκε.', [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]);
    } 
    catch (error: any) 
    {
      console.error("Σφάλμα εγγραφής:", error.code);
      let errorMessage = 'Κάτι πήγε στραβά.';
      if (error.code === 'auth/email-already-in-use') errorMessage = 'Το email χρησιμοποιείται ήδη.';
      if (error.code === 'auth/invalid-email') errorMessage = 'Το email δεν είναι έγκυρο.';
      
      Alert.alert('Σφάλμα Εγγραφής', errorMessage);
    } 
    finally 
    {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={globalStyles.title}>Νέος Λογαριασμός</Text>
        
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
          placeholder="Κωδικός (6+ χαρακτήρες)"
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