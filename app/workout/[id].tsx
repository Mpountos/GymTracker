import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { Colors, globalStyles } from '../../constants/theme';
import { styles } from '../../constants/workoutStyles';
import { db } from '../../firebaseConfig';

export default function WorkoutScreen() {
    const { id, planId } = useLocalSearchParams(); 
    const router = useRouter();
    const [workoutName, setWorkoutName] = useState('');
    const [exercises, setExercises] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [availableExercises, setAvailableExercises] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);

    useEffect(() => { loadWorkoutData(); }, [id, planId]);

    const loadWorkoutData = async () => {
        const savedPlans = await AsyncStorage.getItem('userPlans');
        if (savedPlans) 
        {
            const plans = JSON.parse(savedPlans);
            const workout = plans.find((p: any) => p.id === planId)?.workouts.find((w: any) => w.id === id);
            if (workout) 
            {
                setWorkoutName(workout.name);
                setExercises(workout.exercises.map((ex: any) => typeof ex.sets === 'string' ? { ...ex, sets: [{ id: Date.now().toString(), reps: '', weight: '' }] } : ex));
            }
        }
    };

    const fetchExercises = async () => {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "exercises"));
        const list: any[] = [];
        querySnapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
        setAvailableExercises(list);
        setSelectedExerciseIds(list.filter(dbEx => exercises.some(localEx => localEx.exerciseId === dbEx.id)).map(ex => ex.id));
        setLoading(false);
    };

    const handleUpdateExercises = () => {
        const updated = selectedExerciseIds.map(sid => {
            const dbEx = availableExercises.find(ex => ex.id === sid);
            const existing = exercises.find(ex => ex.exerciseId === sid);
            return existing || { id: Date.now().toString() + Math.random(), exerciseId: sid, name: dbEx.name, category: dbEx.category, sets: [{ id: Date.now().toString(), reps: '', weight: '' }] };
        });
        setExercises(updated);
        setModalVisible(false);
    };

    const renderRightActions = (exId: string) => (
        <Pressable style={{ backgroundColor: Colors.error, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 30, borderRadius: 12, marginBottom: 15, width: 80 }} onPress={() => setExercises(exercises.filter(ex => ex.id !== exId))}>
            <Ionicons name="trash" size={28} color="#FFF" />
        </Pressable>
    );

    const handleSave = async () => {
        const savedPlans = await AsyncStorage.getItem('userPlans');
        if (savedPlans) 
        {
            let plans = JSON.parse(savedPlans);
            plans = plans.map((p: any) => p.id === planId ? { ...p, workouts: p.workouts.map((w: any) => w.id === id ? { ...w, name: workoutName, exercises } : w) } : p);
            await AsyncStorage.setItem('userPlans', JSON.stringify(plans));
            router.back();
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            
            {/* ΡΥΘΜΙΣΗ ΤΟΥ HEADER: Κρύβουμε τον τίτλο και βάζουμε μόνο το βελάκι */}
            <Stack.Screen 
                options={{
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: Colors.background },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, marginLeft: -8 }}>
                            <Ionicons name="arrow-back" size={28} color={Colors.primary} />
                        </TouchableOpacity>
                    )
                }}
            />

            <View style={globalStyles.container}>
                <TextInput style={[globalStyles.input, styles.titleInput]} value={workoutName} onChangeText={setWorkoutName}/>
                <View style={styles.exercisesHeader}>
                    <Text style={styles.sectionTitle}>Exercises</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => { setModalVisible(true); fetchExercises(); }}><Ionicons name="add" size={24} color="#FFF" /></TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {exercises.map((ex, exIndex) => (
                        <Swipeable key={ex.id} renderRightActions={() => renderRightActions(ex.id)}>
                            <View style={styles.exerciseCard}>
                                <Text style={styles.exerciseName}>{ex.name}</Text>
                                
                                {/* Λίστα με τα Sets */}
                                {ex.sets.map((set: any, i: number) => (
                                    <View key={set.id} style={styles.setRow}>
                                        <Text style={styles.setNumber}>Set {i+1}</Text>
                                        <TextInput style={styles.numberInput} keyboardType="numeric" value={set.reps} onChangeText={(v) => { set.reps = v; setExercises([...exercises]); }} />
                                        <Text style={styles.setText}>reps</Text>
                                        <TextInput style={styles.numberInput} keyboardType="numeric" value={set.weight} onChangeText={(v) => { set.weight = v; setExercises([...exercises]); }} />
                                        <Text style={styles.setText}>kg</Text>
                                    </View>
                                ))}
                                
                                {/* Κουμπιά Add και Delete σε μια γραμμή */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                    
                                    {/* + Add set */}
                                    <TouchableOpacity 
                                        onPress={() => {  const updatedExercises = [...exercises]; updatedExercises[exIndex].sets.push({ id: Date.now().toString(), reps: '', weight: '' }); setExercises(updatedExercises); }} 
                                        style={styles.addSetButton}
                                    >
                                        <Ionicons name="add-circle" size={20} color={Colors.primary} />
                                        <Text style={styles.addSetText}>Add set</Text>
                                    </TouchableOpacity>

                                    {/* - Delete set (Εμφανίζεται μόνο αν έχεις > 1 σετ) */}
                                    {ex.sets.length > 1 && (
                                        <TouchableOpacity 
                                            onPress={() => { const updatedExercises = [...exercises]; updatedExercises[exIndex].sets.pop(); setExercises(updatedExercises); }} 
                                            style={[styles.addSetButton, { marginLeft: 10 }]}
                                        >
                                            <Ionicons name="remove-circle" size={20} color={Colors.error} />
                                            <Text style={[styles.addSetText, { color: Colors.error }]}>Delete set</Text>
                                        </TouchableOpacity>
                                    )}

                                </View>
                            </View>
                        </Swipeable>
                    ))}
                </ScrollView>
                <TouchableOpacity style={globalStyles.primaryButton} onPress={handleSave}><Text style={globalStyles.buttonText}>Save</Text></TouchableOpacity>
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}><Ionicons name="close" size={28} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            {availableExercises.map(ex => (
                                <TouchableOpacity key={ex.id} style={[styles.cloudExerciseBtn, selectedExerciseIds.includes(ex.id) && styles.cloudExerciseBtnSelected]} onPress={() => setSelectedExerciseIds(prev => prev.includes(ex.id) ? prev.filter(i => i !== ex.id) : [...prev, ex.id])}>
                                    <Text>{ex.name}</Text><Ionicons name={selectedExerciseIds.includes(ex.id) ? "checkmark-circle" : "add-circle-outline"} size={24} color={Colors.primary} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={globalStyles.primaryButton} onPress={handleUpdateExercises}>
                            <Text style={globalStyles.buttonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </GestureHandlerRootView>
    );
}