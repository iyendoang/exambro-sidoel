import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9fafb', // zinc-50
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: '#fff', // zinc-50
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    // Shadow for Android
    elevation: 10,
    borderColor: '#e5e7eb', // zinc-200
    borderWidth: 0.75,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 24,
  },
  title: {
    marginBottom: 18,
    fontWeight: '600',
    color: '#111827', // zinc-900
    fontSize: 20,
  },
  footer: {
    textAlign: 'center',
    color: '#9ca3af', // zinc-400
    marginTop: 40,
    fontSize: 13,
    fontWeight: '400',
  },
});

export default styles;
