import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  navigationButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  searchInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  clearButtonText: {
    color: '#fff',
  },
});

const InterestSelectionScreen = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleInterestPress = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleClearSelection = () => {
    setSelectedInterests([]);
  };

  const filteredInterests = searchText
    ? interests.filter((interest) => interest.toLowerCase().includes(searchText.toLowerCase()))
    : interests;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your interest</Text>
      <Text style={{ color: '#fff', marginBottom: 20 }}>Choose your interest and with the help of Nonso you will get the best KDN+ has to offer.</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search interests"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <TouchableOpacity style={styles.clearButton} onPress={handleClearSelection}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        {filteredInterests.map((interest) => (
          <TouchableOpacity
            key={interest}
            style={[styles.button, selectedInterests.includes(interest) && { backgroundColor: 'gray' }]}
            onPress={() => handleInterestPress(interest)}
          >
            <Text style={styles.buttonText}>{interest}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.navigationButton}>
          <Text style={{ color: '#fff' }}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={handleNextPress}>
          <Text style={{ color: '#fff' }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InterestSelectionScreen;
