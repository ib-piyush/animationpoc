import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
const AnimatedCharacter = ({ char, delay, fontFamily }) => {
  console.log('fontFamily--:', fontFamily);
  
  const opacity = useSharedValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(1, { duration: 20 });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.Text
      style={[styles.character, animatedStyle, { fontFamily }]}
    >
      {char}
    </Animated.Text>
  );
};

const AnimatedSentence = ({ sentence, delayOffset, fontFamily }) => {
  console.log('fontFamily--:', fontFamily);
  
  return (
    <View style={styles.lineContainer}>
      {sentence.split('').map((char, index) => (
        <AnimatedCharacter
          key={index}
          char={char}
          delay={delayOffset + index * 50}
          fontFamily={fontFamily} // Pass fontFamily to AnimatedCharacter
        />
      ))}
    </View>
  );
};

const SentenceAnimation = ({ sentences, fontFamily }) => {
  console.log('fontFamily--:--', fontFamily);
  const sentenceDelays = sentences.map((sentence, index) => {
    const previousSentencesTime = sentences
      .slice(0, index)
      .reduce((totalTime, prevSentence) => totalTime + prevSentence.length * 50 + 450, 0); // Adjust timing
    return previousSentencesTime;
  });

  return (
    <View style={styles.container}>
      {sentences.map((sentence, index) => (
        <AnimatedSentence
          key={index}
          sentence={sentence}
          delayOffset={sentenceDelays[index]}
          fontFamily={fontFamily} // Pass fontFamily to AnimatedSentence
        />
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
  },
});

export default SentenceAnimation;
