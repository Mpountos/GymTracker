import { StyleSheet } from 'react-native';

export const Colors = 
{
  primary: '#007AFF',     // Το βασικό μπλε
  secondary: '#5856D6',   // Ένα μωβ-μπλε για ποικιλία
  background: '#F2F2F7',  // Ελαφρύ γκρι για το φόντο των σελίδων
  surface: '#FFFFFF',     // Λευκό για τις κάρτες/inputs
  text: '#1C1C1E',        // Σχεδόν μαύρο για κείμενο
  subtext: '#8E8E93',     // Γκρι για δευτερεύον κείμενο
  error: '#FF3B30',       // Κόκκινο για σφάλματα
  border: '#C7C7CC',      // Γκρι για περιγράμματα
};

export const globalStyles = StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  centered: 
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: 
  {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: Colors.text,
  },
  primaryButton: 
  {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Για σκιά σε Android
  },
  buttonText: 
  {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  title: 
  {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  linkText: 
  {
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },


  bigIcons: 
  {
    fontSize: 24,
    color: Colors.primary,
  },
  trashIcons:
  {
    fontSize: 24,
    color: '#fff'  
  },
  trashAction: 
  {
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',  
  },

  modalOverlay:
  { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  modalContent: 
  { 
      width: '85%', 
      backgroundColor: '#fff', 
      padding: 25, 
      borderRadius: 20, 
      alignItems: 'center' 
  },
  modalTitle: 
  { 
      fontSize: 18, 
      fontWeight: 'bold', 
      marginBottom: 20, 
      textAlign: 'center' 
  },
});