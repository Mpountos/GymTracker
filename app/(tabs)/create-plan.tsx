// Αρχείο: app/(tabs)/create-plan.tsx
import { StyleSheet, Text, View } from 'react-native';

export default function CreatePlanScreen() 
{
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Plan</Text>
      <Text>Εδώ θα φτιάχνουμε το εβδομαδιαίο πρόγραμμα</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 }
});