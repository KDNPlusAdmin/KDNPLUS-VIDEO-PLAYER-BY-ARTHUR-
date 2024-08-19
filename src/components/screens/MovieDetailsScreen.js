/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API calls

const API_BASE_URL = 'http://your-api-url.com/api'; // Replace with your actual API URL

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  moviePoster: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 10,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieDescription: {
    color: '#fff',
    textAlign: 'justify',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  castCrewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  castCrewItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  castCrewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  castCrewName: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  plotSummary: {
    color: '#fff',
    marginBottom: 20,
    textAlign: 'justify',
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingStar: {
    marginRight: 5,
    width: 20,
    height: 20,
  },
  recommendationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendationItem: {
    width: 120,
    alignItems: 'center',
    marginBottom: 20,
  },
  recommendationImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  recommendationTitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  const [castAndCrew, setCastAndCrew] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch cast and crew details
    fetchCastAndCrew();

    // Fetch recommended movies
    fetchRecommendations();
  }, []);

  const fetchCastAndCrew = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/${movie.id}/cast-crew`);
      setCastAndCrew(response.data);
    } catch (error) {
      console.error('Error fetching cast and crew:', error);
      Alert.alert('Error', 'Failed to fetch cast and crew details.');
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/${movie.id}/recommendations`);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      Alert.alert('Error', 'Failed to fetch recommendations.');
    }
  };

  const handlePlayMovie = () => {
    // Implement play movie functionality
    console.log('Playing movie:', movie.title);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.poster }} style={styles.moviePoster} />
      <Text style={styles.movieTitle}>{movie.title}</Text>
      <Text style={styles.movieDescription}>{movie.description}</Text>
      <TouchableOpacity style={styles.playButton} onPress={handlePlayMovie}>
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Cast & Crew</Text>
      <View style={styles.castCrewContainer}>
        {castAndCrew.map((member) => (
          <View key={member.id} style={styles.castCrewItem}>
            <Image source={{ uri: member.image }} style={styles.castCrewImage} />
            <Text style={styles.castCrewName}>{member.name}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Plot Summary</Text>
      <Text style={styles.plotSummary}>{movie.plot}</Text>
      <Text style={styles.sectionTitle}>Ratings</Text>
      <View style={styles.ratingsContainer}>
        {/* Example of a star rating system */}
        {[...Array(5)].map((_, index) => (
          <Image
            key={index}
            style={styles.ratingStar}
            source={require('../assets/star-filled.png')}
          />
        ))}
        <Text style={{ color: '#fff', marginLeft: 10 }}>4.5/5</Text>
      </View>
      <Text style={styles.sectionTitle}>Recommendations</Text>
      <FlatList
        horizontal
        data={recommendations}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recommendationItem} onPress={() => navigation.push('MovieDetails', { movie: item })}>
            <Image source={{ uri: item.image }} style={styles.recommendationImage} />
            <Text style={styles.recommendationTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default MovieDetailsScreen;
