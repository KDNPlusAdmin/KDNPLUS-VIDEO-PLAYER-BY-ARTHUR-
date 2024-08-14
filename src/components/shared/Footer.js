import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, PanResponder, Animated } from 'react-native';

const Footer = ({ numberOfPages }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const panResponder = useRef(PanResponder.create({
    onPanResponderMove: (_, gestureState) => {
      // No action on move
    },
    onPanResponderRelease: (_, gestureState) => {
      const swipeThreshold = 50;
      const velocityThreshold = 0.3; // Adjust as needed

      const swipeDirection = gestureState.dx;
      const velocity = gestureState.vx;

      if (Math.abs(swipeDirection) > swipeThreshold) {
        if (velocity > velocityThreshold) {
          // Swiped left with velocity
          setCurrentPage(Math.min(currentPage + 1, numberOfPages - 1));
        } else if (velocity < -velocityThreshold) {
          // Swiped right with velocity
          setCurrentPage(Math.max(currentPage - 1, 0));
        } else {
          // No significant velocity, use direction
          if (swipeDirection > 0) {
            setCurrentPage(Math.max(currentPage - 1, 0));
          } else {
            setCurrentPage(Math.min(currentPage + 1, numberOfPages - 1));
          }
        }
      }
    },
  })).current;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: currentPage * screenWidth,
      useNativeDriver: true,
      bounciness: 8, // Adjust bounciness
      speed: 12, // Adjust speed
    }).start();
  }, [currentPage, screenWidth]);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < numberOfPages; i++) {
      dots.push(
        <TouchableOpacity key={i} onPress={() => handlePageChange(i)}>
          <View style={[styles.dot, currentPage === i ? styles.activeDot : null]} />
        </TouchableOpacity>
      );
    }
    return dots;
  };

  const handlePageChange = (index) => {
    setCurrentPage(index);
  };

  return (
    <PanGestureHandler onHandlerStateChange={panResponder.handlePanResponderEnd}>
      <Animated.View style={[styles.container, { transform: [{ translateX: animatedValue }] }]}>
        {renderDots()}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'red',
  },
});

export default Footer;
