import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import * as Font from 'expo-font';

const InfiniteLoopTabs = () => {
    const screenWidth = Dimensions.get('window').width;
    const scrollAnim = useRef(new Animated.Value(0)).current;
    const scrollAnim1 = useRef(new Animated.Value(1)).current;
    const scrollAnim2 = useRef(new Animated.Value(0)).current;
    const fadeAnimText = useRef(new Animated.Value(0)).current;
    const [showText, setShowText] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const fadeAnimButton = useRef(new Animated.Value(0)).current;

    const [fontsLoaded, setFontsLoaded] = useState(false);

    const tabs = ["Cardio", "Strength", "Flexibility", "Nutrition", "Recovery", "Wellness"];
    const tabs1 = ["Yoga", "Pilates", "CrossFit", "Hydration", "Sleep", "Mental Health"];
    const tabs2 = ["Workouts", "Supplements", "Routine", "Goals", "Diet", "Rest"];

    // Load custom font
    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'EBGaramond-BoldItalic': require('../assets/fonts/EBGaramond-BoldItalic.ttf'),
            });
            setFontsLoaded(true);
        }

        loadFonts();
    }, []);

    // Start the animation
    useEffect(() => {
        // Set the timeouts for showing text and button
        setTimeout(() => {
            setShowText(true); // Show text after 3 seconds
        }, 3000);

        setTimeout(() => {
            setShowButton(true); // Show button after 5 seconds
        }, 5000);

        // Create the animation loops for tabs
        Animated.loop(
            Animated.timing(scrollAnim, {
                toValue: 1, // Move it to the end
                duration: 10000, // Adjust duration to control speed
                useNativeDriver: true,
            })
        ).start();
        Animated.loop(
            Animated.timing(scrollAnim1, {
                toValue: 0,
                duration: 7000, // Faster speed
                useNativeDriver: true,
            })
        ).start();
        Animated.loop(
            Animated.timing(scrollAnim2, {
                toValue: 1,
                duration: 10000, // Slower speed
                useNativeDriver: true,
            })
        ).start();
    }, []);

    // Interpolation for tab scrolling
    const translateX = scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -screenWidth],
    });
    const translateX1 = scrollAnim1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -screenWidth],
    });
    const translateX2 = scrollAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -screenWidth],
    });

    // Trigger animations for the elements when state changes
    useEffect(() => {
        if (showText) {
            Animated.timing(fadeAnimText, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }
    }, [showText]);

    useEffect(() => {
        if (showButton) {
            Animated.timing(fadeAnimButton, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }
    }, [showButton]);

    if (!fontsLoaded) {
        return null; // Optionally return a loading spinner or something else
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.tabsWrapper, { transform: [{ translateX }] }]}>
                {[...tabs, ...tabs, ...tabs, ...tabs, ...tabs, ...tabs].map((tab, index) => (
                    <Text style={styles.tab} key={index}>
                        {tab}
                    </Text>
                ))}
            </Animated.View>

            <Animated.View style={[styles.tabsWrapper, { transform: [{ translateX: translateX1 }] }]}>
                {[...tabs1, ...tabs1, ...tabs1, ...tabs1, ...tabs1, ...tabs1, ...tabs1].map((tab, index) => (
                    <Text style={styles.tab} key={`tab1-${index}`}>
                        {tab}
                    </Text>
                ))}
            </Animated.View>

            <Animated.View style={[styles.tabsWrapper, { transform: [{ translateX: translateX2 }] }]}>
                {[...tabs2, ...tabs2, ...tabs2, ...tabs2, ...tabs2, ...tabs2].map((tab, index) => (
                    <Text style={styles.tab} key={`tab2-${index}`}>
                        {tab}
                    </Text>
                ))}
            </Animated.View>

            {/* Text Fade In */}
            <Animated.View style={[styles.fadeInTextContainer, { opacity: fadeAnimText }]}>
                <Text style={[styles.fadeInText, { fontFamily: 'EBGaramond-BoldItalic' }]}>
                    Perfect your diet.
                </Text>
            </Animated.View>

            {/* Button Fade In */}
            <Animated.View style={[styles.buttonContainer, { opacity: fadeAnimButton }]}>
                <TouchableOpacity style={styles.button} onPress={() => console.log("Sign In Pressed")}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/160/160139.png' }}
                        style={styles.buttonImage}
                    />
                    <Text style={styles.text1}>Sign in with apple</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 100,
        width: '100%',
        overflow: 'hidden',
    },
    tabsWrapper: {
        flexDirection: 'row',
        paddingLeft: 20,
    },
    tab: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 30,
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 20,
        marginVertical: 7,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#fff',
    },
    fadeInTextContainer: {
        position: 'absolute',
        top: '50%',
        left: '30%',
        transform: [{ translateX: -100 }, { translateY: -20 }],
        alignItems: 'center',
    },
    fadeInText: {
        color: '#fff',
        fontSize: 80,
        fontWeight: 'bold',
        fontStyle: 'italic',
        
    },
    buttonContainer: {
        position: 'absolute',
        top: '85%',
        alignItems: 'center',
    },
    button: {
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 90,
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    buttonImage: {
        width: 25,
        height: 25,
        marginRight: 10,
        tintColor: 'white',
    },
    text1: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default InfiniteLoopTabs;
