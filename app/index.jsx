import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, ImageBackground, Image } from 'react-native';
import * as Font from 'expo-font';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import InfiniteLoop from '../components/InfiniteLoop';
import AnimatedTextLine from '../components/AnimatedTextLine';
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showText, setShowText] = useState(true);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [sentencesAnimated, setSentencesAnimated] = useState(false);
  const [sentenceReversed, setReverseSentence] = useState(false);
  const [showReverseAnimation, setShowReverseAnimation] = useState(false);
  const [sentenceCompleted, setSentenceCompleted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const [currentImageIndex3, setCurrentImageIndex3] = useState(0);
  const [currentImageIndex4, setCurrentImageIndex4] = useState(0);
  const [sentence2Animated, setSentence2Animated] = useState(false);
  const [animated2Sentence, setAnimated2Sentence] = useState('');
  const [sentence2Completed, setSentence2Completed] = useState(false);
  const [sentence3Animated, setSentence3Animated] = useState(false);
  const [sentence3Completed, setSentence3Completed] = useState(false);
  const [sentence4Animated, setSentence4Animated] = useState(false);
  const [sentence4Completed, setSentence4Completed] = useState(false);
  const [sentence5Animated, setSentence5Animated] = useState(false);

  const images = [
    require('../assets/images/acne1.jpg'),
    require('../assets/images/acne2.jpg'),
    require('../assets/images/acne3.jpg'),
    require('../assets/images/acne4.jpg'),
    require('../assets/images/acne5.jpg'),
    require('../assets/images/acne6.jpg'),
    require('../assets/images/acne7.jpg'),
  ];
  const images2 = [
    require('../assets/images/gain1.jpg'),
    require('../assets/images/gain2.jpg'),
    require('../assets/images/gain3.jpg'),
    require('../assets/images/gain4.jpg'),
    require('../assets/images/gain5.jpg'),
    require('../assets/images/gain6.jpg'),
    require('../assets/images/gain7.jpg'),
  ];
  const images3 = [
    require('../assets/images/low1.jpg'),
    require('../assets/images/low2.jpg'),
    require('../assets/images/low3.jpg'),
    require('../assets/images/low4.jpg'),
    require('../assets/images/low5.jpg'),
    require('../assets/images/low6.jpg'),
    require('../assets/images/low7.jpg'),
  ];
  const images4 = [
    require('../assets/images/junk.jpg'),
    require('../assets/images/junk2.png'),
    require('../assets/images/junk3.jpg'),
    require('../assets/images/junk4.jpg'),
    require('../assets/images/junk5.jpg'),
    require('../assets/images/junk6.jpg'),
    require('../assets/images/junk7.jpg'),
  ];

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
      setTimeout(() => {

        setSentenceCompleted(true);
      }, 3700);

      setTimeout(() => {
        // clearInterval(intervalId);
        setShowText(false);
      }, 3600);
    }
  }, [fontLoaded]);


  useEffect(() => {
    if (sentenceCompleted) {
      let imageIndex = 0;

      const imageInterval = setInterval(() => {
        if (imageIndex < images.length) {
          setCurrentImageIndex(imageIndex);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          imageIndex++;
        } else {
          clearInterval(imageInterval);

          // setTimeout(() => {
          //   setReverseSentence(true);
          // }, 700);
        }
      }, 220); // Change image every 100ms
      setTimeout(() => {
        console.log(fontLoaded, 'fontLoaded');
        
        setSentenceCompleted(false);
        setSentence2Animated(true);
      }, 1520);
    }
  }, [sentenceCompleted]);

  useEffect(() => {
    if (sentence2Animated) {

      setTimeout(() => {
        setSentence2Animated(false);
        setSentence2Completed(true);
      }, 1600);
    }
    console.log('animated2Sentence', animated2Sentence);

  }, [sentence2Animated]);

  useEffect(() => {
    if (sentence2Completed) {
      let imageIndex = 0;

      const imageInterval = setInterval(() => {
        if (imageIndex < images2.length) {
          setCurrentImageIndex2(imageIndex);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          imageIndex++;
        } else {
          clearInterval(imageInterval);

          // setTimeout(() => {
          //   setReverseSentence(true);
          // }, 700);
        }
      }, 220); // Change image every 100ms
      setTimeout(() => {
        setSentence2Completed(false);
        setSentence3Animated(true);
      }, 1520);
    }

  }, [sentence2Completed]);

  useEffect(() => {
    if (sentence3Animated) {
      
      setTimeout(() => {
        setSentence3Animated(false);
        setSentence3Completed(true);
      }, 1600);
    }

  }, [sentence3Animated]);
  useEffect(() => {
    if (sentence3Completed) {
      let imageIndex = 0;

      const imageInterval = setInterval(() => {
        if (imageIndex < images3.length) {
          setCurrentImageIndex3(imageIndex);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          imageIndex++;
        } else {
          clearInterval(imageInterval);

          // setTimeout(() => {
          //   setReverseSentence(true);
          // }, 700);
        }
      }, 220); // Change image every 100ms
      setTimeout(() => {
        setSentence3Completed(false);
        setSentence4Animated(true);
      }, 1520);
    }

  }, [sentence3Completed]);

  useEffect(() => {
    if (sentence4Animated) {

      setTimeout(() => {
        setSentence4Animated(false);
        setSentence5Animated(true);
      }, 4600);
    }

  }, [sentence4Animated]);
  useEffect(() => {
    if (sentence5Animated) {
      setTimeout(() => {
        setSentence5Animated(false);
        setSentence4Completed(true);
      }, 1600);
    }

  }, [sentence5Animated]);
  useEffect(() => {
    if (sentence4Completed) {
      let imageIndex = 0;

      const imageInterval = setInterval(() => {
        if (imageIndex < images4.length) {
          setCurrentImageIndex4(imageIndex);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          imageIndex++;
        } else {
          clearInterval(imageInterval);

          setTimeout(() => {
            setReverseSentence(true);
          }, 1000);
        }
      }, 220); // Change image every 100ms
      setTimeout(() => {
        setSentence4Completed(false);
        // setReverseSentence(true);
      }, 1520);
    }

  }, [sentence4Completed]);
  useEffect(() => {
    if (sentencesAnimated) {
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
          }, 500);

          setTimeout(() => {
            setShowReverseAnimation(false);
          }, 7600);
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
            duration: 50,
            useNativeDriver: true,
          }).start();

          sentenceIndex--;
          triggerHapticFeedback();
        } else {
          clearInterval(interval);
          setReverseSentence(false);
          setTimeout(() => {
            setSentencesAnimated(true);
          }, 300);
        }
      }, 70);
    }
  }, [sentenceReversed]);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#001400', '#001400', '#001400', '#001400', '#001400',]}
        style={styles.container}
      >
        {showText && (
          <AnimatedTextLine
            fontFamily="Arial"
            sentences={["Over half of the", "population suffers", "from disorders ", "like acne..."]}
          />

        )}
        {sentenceCompleted && (
          <View style={[styles.imageContainer,]}>
            <Image
              source={images[currentImageIndex]}
              style={styles.image}
            />
          </View>
        )}
        {sentence2Animated && (
          <AnimatedTextLine
            fontFamily="tilted-font"
            sentences={["Weight gain...",]}
          />
        )}
        {sentence2Completed && (
          <View style={styles.imageContainer}>
            <Image
              source={images2[currentImageIndex2]}
              style={styles.image}
            />
          </View>
        )}
        {sentence3Animated && (

          <AnimatedTextLine
            fontFamily="tilted-font"
            sentences={["and low energy...",]}
          />
        )}
        {sentence3Completed && (
          <View style={styles.imageContainer}>
            <Image
              source={images3[currentImageIndex3]}
              style={styles.image}
            />
          </View>
        )}
        {sentence4Animated && (
          <AnimatedTextLine
            fontFamily="tilted-font"
            sentences={[" Not because of", "  ", "Genetics", "Lack of Exercise ", "or", "Healthcare Access..."]}
          />
        )}
        {sentence5Animated && (
          
          <AnimatedTextLine
            fontFamily="tilted-font"
            sentences={["But because of", "Diet.",]}
          />
        )}
        {sentence4Completed && (
          <View style={styles.imageContainer}>
            <Image
              source={images4[currentImageIndex4]}
              style={styles.image}
            />
          </View>
        )}
        {sentencesAnimated && (
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

        {sentenceReversed && (
          <ImageBackground
            source={require('../assets/images/picnic.jpeg')}
            style={[styles.sentencesContainer, { marginBottom: 0, marginLeft: '10%',  }]}
          >
            {sentences.slice().map((item, index) => {
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
          </ImageBackground>
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
    width: '80%',
  },
  text: {
    fontSize: 40,
    color: '#fff',
  },
  sentencesContainer: {
    width: '100%', // Ensure container takes the full width
    alignItems: 'flex-start', // Align children to the left
    justifyContent: 'flex-start', // Align vertically to the top if needed
    paddingHorizontal: 20, // Add padding for better alignment
  },
  sentencesText: {
    fontSize: 52,
    color: 'white',
    marginBottom: 5,
    textAlign: 'left', // Align text to the left
    fontFamily: 'tilted-font',
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,

  },
  image: {
    width: 350,
    height: 300,
    resizeMode: 'contain',
  },
});
