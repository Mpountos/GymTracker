import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView, Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../../constants/createPlanStyles';
import { Colors, globalStyles } from '../../constants/theme';

interface Workout 
{
  id: string;
  name: string;
  exercises: any[];
}

interface Plan 
{
  id: string;
  name: string;
  workouts: Workout[];
}

export default function CreatePlanScreen() 
{
  const [plans, setPlans] = useState<Plan[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [planToRename, setPlanToRename] = useState<{id: string, name: string} | null>(null);
  const router = useRouter();

  useFocusEffect(useCallback(() => { loadPlans(); }, []));

  const loadPlans = async () => {
    const savedPlans = await AsyncStorage.getItem('userPlans');
    if (savedPlans) setPlans(JSON.parse(savedPlans));
  };
  const savePlans = async (updatedPlans: Plan[]) => {
    await AsyncStorage.setItem('userPlans', JSON.stringify(updatedPlans));
    setPlans(updatedPlans);
  };

  const handleCreatePlan = async (days: number) => {
    const newPlanId = Date.now().toString();
    const newPlan: Plan = {
      id: newPlanId,
      name: `Plan ${plans.length + 1}`,
      workouts: Array.from({ length: days }, (_, i) => ({
        id: `${newPlanId}_workout_${Date.now() + i}`,
        name: `Workout ${i + 1}`,
        exercises: []
      }))
    };
    savePlans([...plans, newPlan]);
    setModalVisible(false);
    setExpandedPlanId(newPlanId);
  };  
  const handleRenamePlan = async () => {
    if (!planToRename?.name.trim()) return;
    const updatedPlans = plans.map(p => 
      p.id === planToRename.id ? { ...p, name: planToRename.name } : p
    );
    savePlans(updatedPlans);
    setRenameModalVisible(false);
  };
  const handleDeletePlan = (planId: string, planName: string) => {
    if (Platform.OS === 'web') 
    {
      if (window.confirm(`Do you want to Delete this Plan: "${planName}"?`)) savePlans(plans.filter(p => p.id !== planId));
    } 
    else 
    {
      Alert.alert(
        "Delete Plan",
        `Do you want to Delete this Plan: "${planName}"?`,
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Delete", 
            style: "destructive", 
            onPress: () => savePlans(plans.filter(p => p.id !== planId)) 
          }
        ]
      );
    }
  };

  const renderPlanActions = (planId: string, planName: string) => (
    <Pressable style={globalStyles.trashAction} onPress={() => handleDeletePlan(planId, planName)}>
      <Ionicons name="trash" style={globalStyles.trashIcons}/>
    </Pressable>
  );

  const handleAddWorkout = (planId: string) => {
    const updatedPlans = plans.map(p => {
      if (p.id === planId) 
      {
        const newWorkout: Workout = {
          id: `${planId}_workout_${Date.now()}`,
          name: `Workout ${p.workouts.length + 1}`,
          exercises: []
        };
        return { ...p, workouts: [...p.workouts, newWorkout] };
      }
      return p;
    });
    savePlans(updatedPlans);
  };
  const handleDeleteWorkout = (planId: string, workoutId: string) => {
      const updatedPlans = plans.map(p => {
        if (p.id === planId) 
        {
          return { 
            ...p, 
            workouts: p.workouts.filter((w: Workout) => w.id !== workoutId) 
          };
        }
        return p;
      });
      savePlans(updatedPlans);
    };
  
  const renderWorkoutActions = (planId: string, workoutId: string) => (
    <Pressable style={globalStyles.trashAction} onPress={() => handleDeleteWorkout(planId, workoutId)}>
      <Ionicons name="trash" style={globalStyles.trashIcons}/>
    </Pressable>
  );


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[globalStyles.container]}>
        <TouchableOpacity style={[globalStyles.primaryButton, { marginBottom: 20 }]} onPress={() => setModalVisible(true)}>
          <Text style={globalStyles.buttonText}>+ Create a New Plan</Text>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {plans.map((plan) => (
            <Swipeable key={plan.id} renderRightActions={() => renderPlanActions(plan.id, plan.name)} friction={2} overshootRight={false} containerStyle={styles.planContainer}>
              <View>
                <TouchableOpacity style={styles.planHeader} onPress={() => setExpandedPlanId(expandedPlanId === plan.id ? null : plan.id)}>
                  <View>
                    <Text style={styles.planTitle}>{plan.name}</Text>
                    <Text style={styles.planSubtext}>{plan.workouts.length} Days</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { setPlanToRename({ id: plan.id, name: plan.name }); setRenameModalVisible(true); }}>
                      <Ionicons name="color-wand-outline" style={globalStyles.bigIcons}/>
                    </TouchableOpacity>
                    <Ionicons name={expandedPlanId === plan.id ? "chevron-up" : "chevron-down"} style={globalStyles.bigIcons}/>
                  </View>
                </TouchableOpacity>
                
                {expandedPlanId === plan.id && (
                  <View style={styles.workoutContainer}>
                    {plan.workouts.map((workout) => (
                      <View key={workout.id} style={{ marginBottom: 10 }}>
                        <Swipeable renderRightActions={() => renderWorkoutActions(plan.id, workout.id)} friction={2} overshootRight={false} containerStyle={{borderRadius: 8, borderWidth: 1}}>
                          <TouchableOpacity style={styles.workoutButton} onPress={() => router.push({ pathname: '/workout/[id]', params: { id: workout.id, planId: plan.id } })}>
                            <Text style={[styles.workoutText]} numberOfLines={1}>{workout.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={styles.workoutSubtext}>{workout.exercises?.length || 0} Exercises</Text>
                              <Ionicons name="chevron-forward" style={globalStyles.bigIcons}/>
                            </View>
                          </TouchableOpacity>
                        </Swipeable>
                      </View>
                    ))}

                    <TouchableOpacity style={styles.addWorkoutButton} onPress={() => handleAddWorkout(plan.id)}>
                      <Text style={styles.addWorkoutText}>+ Add Workout</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Swipeable>
          ))}
        </ScrollView>
      </View>

      {/* MODALS */}
      <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={globalStyles.modalOverlay}>
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.modalTitle}>Select Number of Workouts</Text>
            <View style={styles.dayGrid}>
              {[1, 2, 3, 4, 5, 6, 7].map(num => (
                <TouchableOpacity key={num} style={styles.dayButton} onPress={() => handleCreatePlan(num)}>
                  <Text style={styles.dayButtonText}>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={{ marginTop: 25, padding: 10 }} onPress={() => setModalVisible(false)}>
              <Text style={{ color: Colors.subtext, fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={renameModalVisible} animationType="fade" transparent={true} onRequestClose={() => setRenameModalVisible(false)}>
        <View style={globalStyles.modalOverlay}>
          <View style={[globalStyles.modalContent, { width: '90%' }]}>
            <Text style={globalStyles.modalTitle}>Rename Plan</Text>
            <TextInput
              style={[globalStyles.input, { width: '100%', marginBottom: 20 }]}
              value={planToRename?.name || ''}
              onChangeText={(text) => setPlanToRename(prev => prev ? { ...prev, name: text } : null)}
              autoFocus={true}
            />
            <View style={{ flexDirection: 'row', gap: 10, width: '100%' }}>
              <TouchableOpacity style={[globalStyles.primaryButton, { flex: 1, backgroundColor: Colors.subtext }]} onPress={() => setRenameModalVisible(false)}>
                <Text style={globalStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[globalStyles.primaryButton, { flex: 1 }]} onPress={handleRenamePlan}>
                <Text style={globalStyles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}