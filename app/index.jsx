import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import * as Font from 'expo-font';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import InfiniteLoop from '../components/InfiniteLoop';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [animatedSentence, setAnimatedSentence] = useState('');
  const [letterOpacity] = useState(new Animated.Value(1));
  const [showText, setShowText] = useState(true);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [sentencesAnimated, setSentencesAnimated] = useState(false);
  const [sentenceReversed, setReverseSentence] = useState(false);
  const [showReverseAnimation, setShowReverseAnimation] = useState(false);

  const sentence = "  Over half of the suffers from the diet related diseases...";
  const sentences = [
    "Get rid of acne",
    "Reduce body fat",
    "Think clearly",
    "Sleep better",
    "Boost energy",
    "Clear Skin",
    "Get Stronger"
  ];

  const sentenceColors = useRef(sentences.map(() => new Animated.Value(0)));
  const sentenceOpacities = useRef(sentences.map(() => new Animated.Value(1)));

  const triggerHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  useLayoutEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'tilted-font': require('../assets/fonts/EBGaramond-BoldItalic.ttf'),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  useEffect(() => {
    if (fontLoaded) {
      setAnimatedSentence('');
      let currentIndex = 0;

      const intervalId = setInterval(() => {
        // Ensure currentIndex is within bounds before updating the sentence
        if (currentIndex < sentence.length) {
          const nextCharacter = sentence[currentIndex]; // safely get the character
          if (nextCharacter !== undefined) {
            setAnimatedSentence((prev) => prev + nextCharacter); // concatenate safely
          }

          // Trigger haptic feedback every 5 characters
          if (currentIndex % 5 === 0) {
            triggerHapticFeedback();
          }

          currentIndex++; // Move to the next character
        } else {
          clearInterval(intervalId); // Stop the interval once the sentence is complete

          // Fade out the sentence with opacity animation
          Animated.timing(letterOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();

          // After the fade-out, trigger the next part of the animation
          setTimeout(() => {
            // setSentencesAnimated(true);
            setReverseSentence(true);
          }, 500);
          
        }
      }, 40); // 100ms interval between each character

      // Stop the interval after 9 seconds, to prevent any infinite loops
      setTimeout(() => {
        clearInterval(intervalId);
        setShowText(false);
      }, 4500);
    }
  }, [fontLoaded]);

  useEffect(() => {
    if (sentencesAnimated) {
      console.log('sentencesAnimated', sentencesAnimated);

      let sentenceIndex = 0;
      const interval = setInterval(() => {
        if (sentenceIndex < sentences.length) {
          if (sentenceIndex > 0) {
            Animated.timing(sentenceColors.current[sentenceIndex - 1], {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }).start();
          }

          Animated.timing(sentenceColors.current[sentenceIndex], {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }).start();
          triggerHapticFeedback();
          setHighlightedIndex(sentenceIndex);
          sentenceIndex++;
        } else {
          clearInterval(interval);
          setSentencesAnimated(false);
          setTimeout(() => {
            setShowReverseAnimation(true);
          }, 1000);

          setTimeout(() => {
            setShowReverseAnimation(false);
          }, 7500);
        }
      }, 300);
    }
  }, [sentencesAnimated]);

  useEffect(() => {
    if (sentenceReversed) {
      let sentenceIndex = sentences.length - 1;
      const interval = setInterval(() => {
        if (sentenceIndex >= 0) {
          Animated.timing(sentenceOpacities.current[sentenceIndex], {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start();

          sentenceIndex--;
          triggerHapticFeedback();
        } else {
          clearInterval(interval);
          setTimeout(() => {
            // setAnimatedSentence(true);
            setReverseSentence(false);
            setSentencesAnimated(true);
          }, 1000);

        }
      }, 100);
    }
  }, [sentenceReversed]);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#001400', '#001400', '#001400', '#001400']}
        style={styles.container}
      >
        {showText && (
          <View style={styles.textContainer}>
            <Animated.Text
              style={[styles.text, { fontFamily: 'tilted-font', opacity: letterOpacity, textAlign: 'center' }]}
            >
              {animatedSentence}
            </Animated.Text>
          </View>
        )}

        {sentencesAnimated  && (
          <View style={styles.sentencesContainer}>
            {sentences.map((item, index) => {
              return (
                <Animated.View key={index}>
                  <Animated.Text
                    style={[
                      styles.sentencesText,
                      {
                        color: sentenceColors.current[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: ['grey', 'white'],
                        }),
                      },
                    ]}
                  >
                    {item}
                  </Animated.Text>
                </Animated.View>
              );
            })}
          </View>
        )}

        {sentenceReversed &&(
          <View style={styles.sentencesContainer}>
            {sentences.slice().reverse().map((item, index) => {
              return (
                <Animated.View key={index}>
                  <Animated.Text
                    style={[
                      styles.sentencesText,
                      {
                        opacity: sentenceOpacities.current[index],
                      },
                    ]}
                  >
                    {item}
                  </Animated.Text>
                </Animated.View>
              );
            })}
          </View>
        )}
        {showReverseAnimation && <InfiniteLoop fontFamily="tilted-font" />}
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  text: {
    fontSize: 40,
    color: '#fff',
  },
  sentencesContainer: {
    marginTop: 20,
  },
  sentencesText: {
    fontSize: 52,
    color: 'white',
    marginBottom: 5,
    textAlign: 'left',
    fontFamily: 'tilted-font',
  },
});
