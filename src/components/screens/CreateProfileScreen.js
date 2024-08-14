import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    color: '#fff',
    fontSize: 24,
  },
  saveButton: {
    color: '#1E90FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 20,
  },
  editProfileButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1E90FF',
    borderRadius: 15,
    padding: 5,
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    backgroundColor: '#1C1C1C',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
});

const CreateProfileScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSaveProfile = () => {
    // Validate and save user profile data
    // Navigate to "Who Is Watching" screen
    if (username.trim() === '' || age.trim() === '') {
      alert('Please enter all fields');
    } else {
      navigation.navigate('WhoIsWatching');
    }
  };

  const handleEditProfileImage = async () => {
    // Request permission to access the camera roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>&lt;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveProfile}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleEditProfileImage}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              // eslint-disable-next-line no-undef, @typescript-eslint/no-require-imports
              : require('./assets/default_profile.png')
          }
          style={styles.profileImage}
        />
        <View style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Age"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={age}
          onChangeText={(text) => setAge(text)}
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default CreateProfileScreen;
