import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, globalStyles } from '../constants/theme';
import { auth } from '../firebaseConfig';

export default function LoginScreen() 
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) 
    {
      Alert.alert('Σφάλμα', 'Παρακαλώ συμπληρώστε όλα τα πεδία.');
      return;
    }

    setLoading(true);
    try 
    {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Σύνδεση επιτυχής!');
      router.replace('/(tabs)');
    } 
    catch (error: any) 
    {
      console.error(error);
      Alert.alert('Σφάλμα Σύνδεσης', 'Λάθος email ή κωδικός.');
    } 
    finally 
    {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={globalStyles.title}>GymTracker</Text>
        
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
          placeholder="Κωδικός"
          placeholderTextColor={Colors.subtext}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          style={globalStyles.primaryButton} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? ( <ActivityIndicator color="#fff" /> ) : ( <Text style={globalStyles.buttonText}>Είσοδος</Text> )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={globalStyles.linkText}>Don't have an account? Create!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}