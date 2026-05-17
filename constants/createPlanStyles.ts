import { StyleSheet } from 'react-native';
import { Colors } from './theme';

export const styles = StyleSheet.create({
    planContainer:
    {
        marginBottom: 15, 
        borderRadius: 12, 
        overflow: 'hidden',
        backgroundColor: Colors.surface, 
        borderWidth: 1,
        flexDirection: 'column',
    },   
    planHeader: 
    { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 20, 
        backgroundColor: Colors.surface 
    },
    planTitle: 
    { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: Colors.text 
    },  
    planSubtext: 
    { 
        color: 'Colors.subtext', 
        marginTop: 4, 
        fontSize: 14 
    },
    workoutContainer: 
    { 
        backgroundColor: Colors.background, 
        paddingHorizontal: 15, 
        paddingBottom: 15 
    },
    workoutButton: 
    { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: Colors.surface, 
        paddingVertical: 12, 
        paddingHorizontal: 15, 
        borderColor: Colors.border,
        justifyContent: 'space-between',
        margin: 0, 
        marginTop: 0, 
        marginBottom: 0
    },
    workoutText: 
    { 
        fontSize: 16, 
        fontWeight: '600', 
        color: Colors.text 
    },
    workoutSubtext:
    {
        fontSize: 13, 
        color: Colors.subtext 
    },
    addWorkoutButton:
    {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 12, 
        marginTop: 5, 
        borderWidth: 1, 
        borderColor: Colors.primary, 
        borderStyle: 'dashed', borderRadius: 8 
    },
    addWorkoutText:
    {
        color: Colors.primary, 
        fontWeight: '600', 
        marginLeft: 8 
    },

    dayGrid: 
    { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: 12 
    },
    dayButton: 
    {   
        backgroundColor: Colors.primary, 
        width: 50, 
        height: 50, 
        borderRadius: 25, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    dayButtonText: 
    { 
        color: 'white', 
        fontSize: 20, 
        fontWeight: 'bold' 
    }
});