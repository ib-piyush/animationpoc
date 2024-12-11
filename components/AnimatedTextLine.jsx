import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import * as Font from 'expo-font';
import * as Haptics from 'expo-haptics';

const AnimatedCharacter = ({ char, delay }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(1, { duration: 0 });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.Text style={[styles.character, animatedStyle]}>
      {char}
    </Animated.Text>
  );
};

const SentenceAnimation = ({ sentences }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      try {
        await Font.loadAsync({
          'tilted-font': require('../assets/fonts/italic.ttf'),
        });
        setFontLoaded(true);
      } catch (error) {
        console.error('Error loading font:', error);
      }
    };

    loadFont();
  }, []);

  const sentenceDelays = sentences.map((sentence, index) => {
    const previousSentencesTime = sentences
      .slice(0, index)
      .reduce((totalTime, prevSentence) => totalTime + prevSentence.length * 20 + 450, 0); // Adjust timing
    return previousSentencesTime;
  });

  if (!fontLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <View style={styles.container}>
      {sentences.map((sentence, index) => (
        <View style={styles.lineContainer} key={index}>
          {sentence.split('').map((char, charIndex) => (
            <AnimatedCharacter key={charIndex} char={char} delay={sentenceDelays[index] + charIndex * 50} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  lineContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  character: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'tilted-font', // Apply custom font
    fontStyle: 'italic',
    fontWeight: '100',
    lineHeight: 40
    // transform: [{ rotate: '20deg' }], // Tilt the text
  },
});

export default SentenceAnimation;
