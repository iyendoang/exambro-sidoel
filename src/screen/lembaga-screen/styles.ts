import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
  },
  divider: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'flex-start',
  },
  card: {
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  centerContent: {
    alignItems: 'center',
  },
  avatarLogo: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#0f0f0f0',
    marginBottom: 12,
  },
  avatarIcon: {
    marginRight: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },

  cardAcction: {
    elevation: 3,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  linksContainer: {
    marginTop: 4,
    marginBottom: 4,
  },
  linkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    marginVertical: 6,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  progressBar: {
    marginTop: 20,
    width: '80%',
    height: 4,
    borderRadius: 2,
  },
});

export default styles;
