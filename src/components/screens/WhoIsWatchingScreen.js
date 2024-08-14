import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  addButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  editButton: {
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  userContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  userCard: {
    width: 100,
    height: 120,
    backgroundColor: '#222',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: '#fff',
    marginTop: 10,
  },
});

const WhoIsWatchingScreen = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: 'Tosin', avatar: require('./tosin.png'), content: ['Movie 1', 'TV Show 2'] },
    { id: 2, name: 'Elizabeth', avatar: require('./elizabeth.png'), content: ['Movie 3', 'TV Show 4'] },
  ]);

  const navigation = useNavigation();

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    navigation.navigate('Content', { user }); // Navigate to content screen
  };

  const handleAddUserProfile = () => {
    navigation.navigate('CreateProfile');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { user: selectedUser });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddUserProfile}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          {/* Edit button icon or text */}
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Who's Watching?</Text>
      <View style={styles.userContainer}>
        {users.map((user) => (
          <TouchableOpacity key={user.id} style={styles.userCard} onPress={() => handleUserSelect(user)}>
            <Image source={user.avatar} style={{ width: 80, height: 80 }} />
            <Text style={styles.userName}>{user.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default WhoIsWatchingScreen;
