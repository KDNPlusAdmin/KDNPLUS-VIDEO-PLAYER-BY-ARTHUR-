/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useNavigation } from '@react-navigation/native' ;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  moviePoster: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieDescription: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  playButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  recommendationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  recommendationItem: {
    width: 100,
    alignItems: 'center',
  },
  recommendationImage: {
    width: 80,
    height: 80,
  },
  recommendationTitle: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  castCrewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  castCrewItem: {
    width: 100,
    alignItems: 'center',
    marginBottom: 10,
  },
  castCrewImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  castCrewName: {
    color: '#fff',
    textAlign: 'center',
  },
  plotSummary: {
    color: '#fff',
    marginBottom: 20,
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    marginRight: 5,
  },
});

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.poster }} style={styles.moviePoster} />
      <Text style={styles.movieTitle}>{movie.title}</Text>
      <Text style={styles.movieDescription}>{movie.description}</Text>
      <TouchableOpacity style={styles.playButton}>
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
      <Text style={{ color: '#fff', marginTop: 20 }}>Cast & Crew</Text>
      <View style={styles.castCrewContainer}>
        {/* Render cast and crew members */}
      </View>
      <Text style={{ color: '#fff', marginTop: 20 }}>Plot Summary</Text>
      <Text style={styles.plotSummary}>{movie.plot}</Text>
      <Text style={{ color: '#fff', marginTop: 20 }}>Ratings</Text>
      <View style={styles.ratingsContainer}>
        {/* Render star ratings */}
      </View>
      <Text style={{ color: '#fff', marginTop: 20 }}>Recommendations</Text>
      <View style={styles.recommendationsContainer}>
        {/* Render recommended movies */}
      </View>
    </ScrollView>
  );
};

export default MovieDetailsScreen;
