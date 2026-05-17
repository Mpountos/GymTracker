import { StyleSheet } from 'react-native';
import { Colors } from './theme';

export const styles = StyleSheet.create({
    label: 
    { 
        fontSize: 14, 
        color: Colors.subtext, 
        marginBottom: 5, 
        marginTop: 10 
    },
    titleInput: 
    { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: Colors.primary, 
        backgroundColor: Colors.surface 
    },
    exercisesHeader: 
    { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 20, 
        marginBottom: 15 
    },
    sectionTitle: 
    { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: Colors.text 
    },
    addButton: 
    { 
        backgroundColor: Colors.primary, 
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    exercisesList: 
    { 
        flex: 1, 
        paddingBottom: 20 
    },
    emptyState: 
    { 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 50 
    },
    emptyStateText: 
    { 
        color: Colors.subtext, 
        textAlign: 'center', 
        marginTop: 15, 
        paddingHorizontal: 20 
    },
    exerciseCard: 
    { 
        backgroundColor: Colors.surface, 
        borderRadius: 12, 
        padding: 15, 
        marginBottom: 15, 
        borderWidth: 1, 
        borderColor: Colors.border 
    },
    exerciseCardHeader: 
    { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: 15, 
        paddingBottom: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: Colors.background 
    },
    exerciseName: 
    { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: Colors.text 
    },
    exerciseCategory: 
    { 
        fontSize: 13, 
        color: Colors.subtext, 
        marginTop: 4 
    },
    setRow: 
    { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 10 
    },
    setNumber: 
    { 
        width: 50, 
        fontSize: 14, 
        fontWeight: '600', 
        color: Colors.subtext 
    },
    numberInput: 
    { 
        backgroundColor: Colors.background, 
        borderWidth: 1, 
        borderColor: Colors.border, 
        borderRadius: 8, 
        paddingVertical: 5, 
        paddingHorizontal: 10, 
        width: 55, 
        textAlign: 'center', 
        fontSize: 16, 
        color: Colors.text 
    },
    setText: 
    { 
        fontSize: 14,
        color: Colors.text, 
        marginHorizontal: 8 
    },
    addSetButton: 
    { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 10, 
        alignSelf: 'flex-start', 
        paddingVertical: 5 
    },
    addSetText: 
    { 
        color: Colors.primary, 
        fontWeight: '600', 
        marginLeft: 5, 
        fontSize: 14 
    },
    modalOverlay: 
    { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'flex-end' 
    },
    modalContent: 
    { 
        backgroundColor: Colors.background, 
        height: '85%', 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        padding: 20 
    },
    modalHeader: 
    { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: Colors.border, 
        paddingBottom: 15
    },
    modalTitle: 
    { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: Colors.text
    },
    cloudExerciseBtn: 
    { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: Colors.surface, 
        padding: 15, 
        borderRadius: 10, 
        marginBottom: 10,
        borderWidth: 1, 
        borderColor: Colors.border 
    },
    cloudExerciseBtnSelected: 
    { 
        borderColor: Colors.primary, 
        backgroundColor: '#E5F1FF' 
    },
    cloudExerciseName: 
    { 
        fontSize: 16, 
        fontWeight: '600', 
        color: Colors.text 
    },
    cloudExerciseCategory: 
    { 
        fontSize: 14, 
        color: Colors.subtext, 
        marginTop: 4 
    },
    modalFooter: 
    { borderTopWidth: 1, 
        borderTopColor: Colors.border, 
        paddingTop: 15, 
        marginTop: 10 
    }
});