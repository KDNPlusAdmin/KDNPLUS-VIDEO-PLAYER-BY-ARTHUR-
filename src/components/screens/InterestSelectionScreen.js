/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios'; // Import Axios for API calls

const API_BASE_URL = 'http://your-api-url.com/api'; // Replace with your actual API URL

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

const InterestSelectionScreen = ({ navigation }) => {
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Fetch interests from API when component mounts
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/interests`);
        setInterests(response.data);
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };
    
    fetchInterests();
  }, []);

  // Handle selecting and deselecting interests
  const handleInterestPress = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Handle clearing selections
  const handleClearSelection = () => {
    setSelectedInterests([]);
  };

  // Handle saving selections to API
  const handleSaveSelections = async () => {
    try {
      await axios.post(`${API_BASE_URL}/user/interests`, { interests: selectedInterests });
      navigation.navigate('NextScreen'); // Replace with your actual screen name
    } catch (error) {
      console.error('Error saving interests:', error);
    }
  };

  // Filter interests based on search text
  const filteredInterests = searchText
    ? interests.filter((interest) => interest.toLowerCase().includes(searchText.toLowerCase()))
    : interests;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your interest</Text>
      <Text style={{ color: '#fff', marginBottom: 20 }}>
        Choose your interest and with the help of Nonso you will get the best KDN+ has to offer.
      </Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search interests"
        placeholderTextColor="#ccc"
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
        <TouchableOpacity style={styles.navigationButton} onPress={handleClearSelection}>
          <Text style={{ color: '#fff' }}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={handleSaveSelections}>
          <Text style={{ color: '#fff' }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InterestSelectionScreen;
