import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    top: 10,
    width: '90%',
    height: 300,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    paddingVertical: 70,
    paddingHorizontal: 15,
    left: 0.05 * screenWidth,
  },
  inputWrapper: {
    marginBottom: 10,
  },
  mainLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 100,
  },
  label: {
    fontSize: 16,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 0.05 * screenHeight,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  suggestions: {
    maxHeight: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  map: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
});

export default styles;
