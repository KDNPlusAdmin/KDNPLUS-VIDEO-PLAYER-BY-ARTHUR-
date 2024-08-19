/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Modal,
  FlatList,
  Pressable,
  Alert,
  Animated,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import axios from 'axios'; // Import axios for API calls

const { width, height } = Dimensions.get('window');

const API_BASE_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

const VideoPlayerScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isAudioSubtitlesVisible, setIsAudioSubtitlesVisible] = useState(false);
  const [isBrightnessVisible, setIsBrightnessVisible] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [volume, setVolume] = useState(1);
  const [selectedAudioTrack, setSelectedAudioTrack] = useState({});
  const [selectedTextTrack, setSelectedTextTrack] = useState({});
  const [videoQuality, setVideoQuality] = useState('auto');
  const [videoSource, setVideoSource] = useState(movie.videoUrl);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation value for control visibility
  const controlOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fetchVideoDetails(movie.id); // Fetch video details on component mount
  }, [movie.id]);

  useEffect(() => {
    // Animate control visibility
    Animated.timing(controlOpacity, {
      toValue: showControls ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showControls]);

  // Fetch video details including available qualities, tracks, etc.
  const fetchVideoDetails = async (videoId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/videos/${videoId}`);
      if (response.status === 200) {
        const videoDetails = response.data;
        // Update video source based on initial quality preference
        const qualityLevels = {
          auto: videoDetails.videoUrl,
          '720p': videoDetails.videoUrl720p,
          '1080p': videoDetails.videoUrl1080p,
        };
        setVideoSource(qualityLevels[videoQuality]);
        // Set available audio and text tracks
        movie.audioTracks = videoDetails.audioTracks;
        movie.textTracks = videoDetails.textTracks;
        setLoading(false);
      } else {
        throw new Error('Failed to fetch video details');
      }
    } catch (error) {
      setError('Failed to load video details. Please try again later.');
      console.error('Fetch Video Details Error:', error);
      setLoading(false);
    }
  };

  const handlePlayPause = () => {
    setPaused(!paused);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgress = (progress) => {
    setCurrentTime(progress.currentTime);
    // Optionally, you can send the progress to the server
    sendProgressUpdate(movie.id, progress.currentTime);
  };

  const handleEnd = () => {
    setPaused(true);
    videoRef.current.seek(0);
  };

  const handleLoad = (meta) => {
    setDuration(meta.duration);
  };

  const handleSeek = (time) => {
    videoRef.current.seek(time);
    setCurrentTime(time);
  };

  const handleVideoError = (error) => {
    Alert.alert('Video Error', 'An error occurred while playing the video. Please try again.');
    console.error('Video Error:', error);
  };

  const toggleControls = () => {
    if (!isLocked) {
      setShowControls(!showControls);
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    setShowControls(!isLocked);
  };

  const toggleAudioSubtitles = () => {
    setIsAudioSubtitlesVisible(!isAudioSubtitlesVisible);
  };

  const toggleBrightness = () => {
    setIsBrightnessVisible(!isBrightnessVisible);
  };

  const handleSelectAudioTrack = (track) => {
    setSelectedAudioTrack(track);
    setIsAudioSubtitlesVisible(false);
  };

  const handleSelectTextTrack = (track) => {
    setSelectedTextTrack(track);
    setIsAudioSubtitlesVisible(false);
  };

  const handleQualityChange = (quality) => {
    setVideoQuality(quality);
    const qualityLevels = {
      auto: movie.videoUrl,
      '720p': movie.videoUrl720p,
      '1080p': movie.videoUrl1080p,
    };
    setVideoSource(qualityLevels[quality]);
  };

  // Send progress update to the server
  const sendProgressUpdate = async (videoId, currentTime) => {
    try {
      await axios.post(`${API_BASE_URL}/videos/progress`, {
        videoId,
        currentTime,
      });
    } catch (error) {
      console.error('Send Progress Update Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />
      ) : (
        <>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <TouchableOpacity style={styles.videoWrapper} onPress={toggleControls}>
              <Video
                ref={videoRef}
                source={{ uri: videoSource }}
                style={styles.video}
                paused={paused}
                muted={isMuted}
                volume={volume}
                onProgress={handleProgress}
                onEnd={handleEnd}
                onLoad={handleLoad}
                onError={handleVideoError}
                resizeMode="cover"
                selectedAudioTrack={selectedAudioTrack}
                selectedTextTrack={selectedTextTrack}
              />
              {showControls && (
                <Animated.View style={[styles.controls, { opacity: controlOpacity }]}>
                  <View style={styles.topControls}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Icon name="chevron-back" size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{movie.title}</Text>
                    <TouchableOpacity onPress={toggleBrightness}>
                      <Icon name="sunny" size={30} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.middleControls}>
                    <TouchableOpacity onPress={() => handleSeek(currentTime - 10)}>
                      <Icon name="play-back" size={40} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePlayPause}>
                      <Icon name={paused ? 'play' : 'pause'} size={50} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSeek(currentTime + 10)}>
                      <Icon name="play-forward" size={40} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.bottomControls}>
                    <TouchableOpacity onPress={toggleAudioSubtitles}>
                      <Icon name="text" size={30} color="#fff" />
                      <Text style={styles.controlLabel}>Audio & Subtitle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleLock}>
                      <Icon
                        name={isLocked ? 'lock-closed' : 'lock-open'}
                        size={30}
                        color="#fff"
                      />
                      <Text style={styles.controlLabel}>Lock</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleMute}>
                      <Icon
                        name={isMuted ? 'volume-mute' : 'volume-high'}
                        size={30}
                        color="#fff"
                      />
                      <Text style={styles.controlLabel}>Mute</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.progressBar}>
                    <Slider
                      style={{ width: '100%', height: 40 }}
                      minimumValue={0}
                      maximumValue={duration}
                      value={currentTime}
                      onValueChange={handleSeek}
                      minimumTrackTintColor="#ffffff"
                      maximumTrackTintColor="#000000"
                    />
                    <View style={styles.timeInfo}>
                      <Text style={styles.timeText}>
                        {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
                      </Text>
                      <Text style={styles.timeText}>
                        {Math.floor(duration / 60)}:{Math.floor(duration % 60)}
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              )}
            </TouchableOpacity>
          )}

          <Modal visible={isAudioSubtitlesVisible} transparent animationType="slide">
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Audio & Subtitles</Text>
              <Text style={styles.modalSubtitle}>Audio</Text>
              <FlatList
                data={movie.audioTracks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectAudioTrack(item)}>
                    <Text style={styles.modalItem}>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
              <Text style={styles.modalSubtitle}>Subtitles</Text>
              <FlatList
                data={movie.textTracks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectTextTrack(item)}>
                    <Text style={styles.modalItem}>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
              <Pressable onPress={toggleAudioSubtitles}>
                <Text style={styles.modalCloseButton}>Close</Text>
              </Pressable>
            </View>
          </Modal>

          <Modal visible={isBrightnessVisible} transparent animationType="slide">
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Brightness</Text>
              <Slider
                style={{ width: '80%', height: 40 }}
                minimumValue={0}
                maximumValue={1}
                value={brightness}
                onValueChange={setBrightness}
                minimumTrackTintColor="#ffffff"
                maximumTrackTintColor="#000000"
              />
              <Pressable onPress={toggleBrightness}>
                <Text style={styles.modalCloseButton}>Close</Text>
              </Pressable>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: height,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  middleControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  controlLabel: {
    color: '#fff',
    fontSize: 12,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  modalItem: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 5,
  },
  modalCloseButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
});

export default VideoPlayerScreen;
