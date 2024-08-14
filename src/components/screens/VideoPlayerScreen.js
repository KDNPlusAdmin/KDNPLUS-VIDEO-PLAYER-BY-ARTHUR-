/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
// VideoPlayerScreen.js
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Modal,
  ScrollView,
  FlatList,
  Pressable
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

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

  const handlePlayPause = () => {
    setPaused(!paused);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgress = (progress) => {
    setCurrentTime(progress.currentTime);
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

  const toggleControls = () => {
    if (!isLocked) {
      setShowControls(!showControls);
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    setShowControls(!isLocked); // Show controls when unlocked
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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.videoWrapper} onPress={toggleControls}>
        <Video
          ref={videoRef}
          source={{ uri: movie.videoUrl }}
          style={styles.video}
          paused={paused}
          muted={isMuted}
          volume={volume}
          onProgress={handleProgress}
          onEnd={handleEnd}
          onLoad={handleLoad}
          resizeMode="cover"
          selectedAudioTrack={selectedAudioTrack}
          selectedTextTrack={selectedTextTrack}
        />
        {showControls && (
          <View style={styles.controls}>
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
                <Icon name={isLocked ? 'lock-closed' : 'lock-open'} size={30} color="#fff" />
                <Text style={styles.controlLabel}>{isLocked ? 'Unlock' : 'Lock'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleMute}>
                <Icon name={isMuted ? 'volume-mute' : 'volume-high'} size={30} color="#fff" />
                <Text style={styles.controlLabel}>Volume</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('NextEpisode', { currentMovie: movie })}>
                <Icon name="play-skip-forward" size={30} color="#fff" />
                <Text style={styles.controlLabel}>Next Episode</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.seekBarContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#000"
                onValueChange={handleSeek}
              />
              <Text style={styles.time}>
                {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      {/* Audio & Subtitle Modal */}
      <Modal
        visible={isAudioSubtitlesVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleAudioSubtitles}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Audio Track</Text>
            <FlatList
              data={movie.audioTracks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleSelectAudioTrack(item)} style={styles.modalItem}>
                  <Text style={styles.modalText}>{item.title}</Text>
                </Pressable>
              )}
            />
            <Text style={styles.modalTitle}>Select Subtitle Track</Text>
            <FlatList
              data={movie.textTracks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleSelectTextTrack(item)} style={styles.modalItem}>
                  <Text style={styles.modalText}>{item.title}</Text>
                </Pressable>
              )}
            />
            <TouchableOpacity onPress={toggleAudioSubtitles} style={styles.modalCloseButton}>
              <Icon name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Brightness Control */}
      {isBrightnessVisible && (
        <View style={styles.brightnessContainer}>
          <Text style={styles.brightnessLabel}>Brightness</Text>
          <Slider
            style={styles.brightnessSlider}
            minimumValue={0}
            maximumValue={1}
            value={brightness}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#000"
            onValueChange={setBrightness}
          />
          <TouchableOpacity onPress={toggleBrightness} style={styles.modalCloseButton}>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
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
  },
  video: {
    width: width,
    height: height,
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  middleControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlLabel: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  seekBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  slider: {
    flex: 1,
    marginRight: 10,
  },
  time: {
    color: '#fff',
    width: 50,
    textAlign: 'right',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#222',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalText: {
    color: '#fff',
    fontSize: 14,
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  brightnessContainer: {
    position: 'absolute',
    top: height / 2 - 100,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  brightnessLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  brightnessSlider: {
    width: '100%',
  },
});

export default VideoPlayerScreen;
