import React from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const LocationInput = ({ placeholder, onChangeText, suggestions, onSuggestionPress, label }) => (
  <View style={styles.inputWrapper}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={styles.input}
    />
    <FlatList
      style={styles.suggestions}
      data={suggestions}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.suggestionItem} onPress={() => onSuggestionPress(item)}>
          <Text style={styles.suggestionText}>{item.formatted}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  </View>
);

export default LocationInput;
