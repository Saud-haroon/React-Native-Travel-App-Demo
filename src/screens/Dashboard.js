import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    Animated,
    TouchableOpacity,
    ScrollView,
    Platform,
    FlatList,
    StatusBar
} from 'react-native';

import { TextButton } from '../components'


import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants'
import Place from './Place';

const COUNTRIES_ITEM_SIZES = SIZES.width / 3
const PLACES_ITEM_SIZE = Platform.OS === 'ios' ? SIZES.width / 1.25 : SIZES.width / 1.2
const EMPTY_ITEM_SIZE = (SIZES.width - PLACES_ITEM_SIZE) / 2

const Dashboard = ({ navigation }) => {
    const [countries, setcountries] = useState([{ id: -1 }, ...dummyData.countries, { id: -2 }])
    const [places, setPlaces] = useState([{ id: -1 }, ...dummyData.countries[0].places, { id: -2 }])
    const [placesScrollPosition, setPlacesScrollPosition] = useState(0)

    const conuntryScrollX = useRef(new Animated.Value(0)).current;
    const placesScrollX = useRef(new Animated.Value(0)).current;

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.base,
                    alignItems: 'center',
                    marginTop: SIZES.padding * 1.5

                }}
            >
                {/* Side Drawer */}
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 45,
                        height: 45
                    }}
                    onPress={() => console.log('Side Drawer')}
                >
                    <Image
                        source={icons.side_drawer}
                        resizeMode='contain'
                        style={{ tintColor: COLORS.white, height: 25, width: 25 }}

                    />
                </TouchableOpacity>
                {/* Title */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>ASIA</Text>
                </View>

                {/* Profile */}
                <TouchableOpacity
                    onPress={() => console.log('Profile')}
                >
                    <Image
                        source={images.profile_pic}
                        resizeMode="contain"
                        style={{
                            height: 45,
                            width: 45,
                            borderRadius: 25
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderCountries() {
        return (
            <Animated.FlatList
                horizontal
                pagingEnabled
                snapToAlignment='center'
                snapToInterval={COUNTRIES_ITEM_SIZES}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={0}
                data={countries}
                keyExtractor={(item) => `${item.id}`}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: conuntryScrollX } } }
                ], { useNativeDriver: false })}
                onMomentumScrollEnd={(event) => {
                    // Calcullating the Country Position
                    var position = (event.nativeEvent.contentOffset.x / COUNTRIES_ITEM_SIZES).toFixed(0)
                    setPlaces([
                        { id: -1 },
                        ...dummyData.countries[position].places,
                        { id: -2 }
                    ])
                }}
                renderItem={({ item, index }) => {
                    const opacity = conuntryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZES,
                            (index - 1) * COUNTRIES_ITEM_SIZES,
                            index * COUNTRIES_ITEM_SIZES
                        ],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp'
                    })

                    const mapSoize = conuntryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZES,
                            (index - 1) * COUNTRIES_ITEM_SIZES,
                            index * COUNTRIES_ITEM_SIZES
                        ],
                        outputRange: [25, Platform.OS === 'ios' ? 80 : 60, 25],
                        extrapolate: 'clamp'
                    })


                    const fontSIze = conuntryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZES,
                            (index - 1) * COUNTRIES_ITEM_SIZES,
                            index * COUNTRIES_ITEM_SIZES
                        ],
                        outputRange: [15, 25, 15],
                        extrapolate: 'clamp'
                    })

                    if (index === 0 || index == countries.length - 1) {
                        return (
                            <View
                                style={{ width: COUNTRIES_ITEM_SIZES }}
                            />
                        )
                    } else {
                        return (
                            <Animated.View
                                opacity={opacity}
                                style={{
                                    height: 130,
                                    width: COUNTRIES_ITEM_SIZES,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Animated.Image
                                    source={item.image}
                                    resizeMode='contain'
                                    style={{
                                        width: mapSoize,
                                        height: mapSoize,
                                        tintColor: COLORS.white
                                    }}
                                />
                                <Animated.Text style={{ marginTop: 3, color: COLORS.white, ...FONTS.h1, fontSize: fontSIze }}>
                                    {item.name}
                                </Animated.Text>
                            </Animated.View>
                        )
                    }
                }}
            />
        )
    }
    function renderPlaces() {
        return (
            <Animated.FlatList
                horizontal
                pagingEnabled
                snapToAlignment='center'
                snapToInterval={Platform.OS === 'ios' ? PLACES_ITEM_SIZE + 28 : PLACES_ITEM_SIZE}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={0}
                bounces={false}
                data={places}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: placesScrollX } } }
                ], { useNativeDriver: false })}
                onMomentumScrollEnd={(event) => {
                    var position = (event.nativeEvent.contentOffset.x / PLACES_ITEM_SIZE).toFixed(0)
                    setPlacesScrollPosition(position)
                }}
                renderItem={({ item, index }) => {
                    const opacity = placesScrollX.interpolate({
                        inputRange: [
                            (index - 2) * PLACES_ITEM_SIZE,
                            (index - 1) * PLACES_ITEM_SIZE,
                            index * PLACES_ITEM_SIZE
                        ],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp'
                    })

                    let activeheight = 0

                    if (Platform.OS === 'ios') {
                        if (SIZES.height > 800) {
                            activeheight = SIZES.height / 2
                        } else {
                            activeheight = SIZES.height / 1.65
                        }
                    } else {
                        activeheight = SIZES.height / 1.65
                    }

                    const height = placesScrollX.interpolate({
                        inputRange: [
                            (index - 2) * PLACES_ITEM_SIZE,
                            (index - 1) * PLACES_ITEM_SIZE,
                            index * PLACES_ITEM_SIZE
                        ],
                        outputRange: [SIZES.height / 2.25, activeheight, SIZES.height / 2.25],
                        extrapolate: 'clamp'
                    })

                    if (index === 0 || index == places.length - 1) {
                        return (
                            <View
                                style={{ width: EMPTY_ITEM_SIZE }}
                            />
                        )
                    } else {
                        return (
                            <Animated.View
                                opacity={opacity}
                                style={{
                                    width: PLACES_ITEM_SIZE,
                                    height: height,
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    padding: 10
                                }}
                            >
                                <Image
                                    source={item.image}
                                    resizeMode='cover'
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 20


                                    }}

                                />
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        marginHorizontal: SIZES.padding
                                    }}
                                >
                                    <Text style={{
                                        marginBottom: SIZES.radius,
                                        color: COLORS.white,
                                        ...FONTS.h1
                                    }}>
                                        {item.name}
                                    </Text>
                                    <Text style={{
                                        marginBottom: SIZES.padding * 2,
                                        textAlign: 'center',
                                        color: COLORS.white,
                                        ...FONTS.body3
                                    }}>
                                        {item.description}
                                    </Text>
                                </View>
                                <TextButton
                                    label='Explore'
                                    customContainerStyle={{
                                        position: 'absolute',
                                        bottom: -5,
                                        width: 150
                                    }}
                                    onPress={() => exploreButtonHandler()}

                                />
                            </Animated.View>

                        )

                    }

                }}

            />
        )
    }

    function exploreButtonHandler() {
        //Get Place Current Index
        const currentIndex = parseInt(placesScrollPosition, 10) + 1

        // Navigate to the Next screen
        navigation.navigate('Place', { selectedPlace: places[currentIndex] })
    }
    return (
        <>
            <StatusBar
                translucent={true}
                animated={true}
                backgroundColor='transparent'
            />
            <View style={{ flex: 1, backgroundColor: COLORS.black }}>
                {renderHeader()}

                <ScrollView contentContainerStyle={{ paddingBottom: Platform.os === 'ios' ? 40 : 0 }}>
                    <View style={{ height: 700 }}>
                        {/* Countries */}
                        <View>
                            {renderCountries()}
                        </View>
                        {/* Place */}
                        <View style={{ height: Platform.OS === "ios" ? 500 : 450 }}>
                            {renderPlaces()}
                        </View>

                    </View>

                </ScrollView>




            </View>
        </>
    )
}

export default Dashboard;