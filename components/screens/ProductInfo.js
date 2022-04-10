import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, StatusBar, Dimensions, ToastAndroid, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, Items } from '../../data/images/data';
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'


const ProductInfo = ({ route, navigation }) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => (
            getDataFromDB()
        ))
        return unsubscribe
    }, [navigation]);

    const getDataFromDB = async () => {
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].id == productID) {
                await setProduct(Items[index])
                return
            }
        }
    }

    const width = Dimensions.get('window').width

    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)

    const { productID } = route.params

    const addToCart = async id => {
        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray);
        if (itemArray) {
            let array = itemArray;
            array.push(id);

            try {
                console.log(itemArray)
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                ToastAndroid.show(
                    'Item Added Successfully to cart',
                    ToastAndroid.SHORT,
                );
                navigation.navigate('Home');
            } catch (error) {
                return error;
            }
        } else {
            let array = [];
            array.push(id);
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                ToastAndroid.show(
                    'Item Added Successfully to cart',
                    ToastAndroid.SHORT,
                );
                navigation.navigate('Home');
            } catch (error) {
                return error;
            }
        }
    }

    const renderProduct = ({ item, index }) => {
        return (
            <View style={{
                width: width,
                height: 240,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Image source={item}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain'
                    }}
                />

            </View>
        )
    }

    return (
        <View style={{
            paddingTop: '7%',
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.white,
            position: 'relative'
        }}>

            <StatusBar backgroundColor={COLORS.backgroundLight} barStyle='dark-content' />
            <ScrollView>
                <View style={{
                    width: '100%',
                    backgroundColor: COLORS.backgroundLight,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 4
                }}>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: 16,
                        paddingLeft: 16
                    }}>
                        <TouchableOpacity>
                            <Entypo name='chevron-left'
                                onPress={() => { navigation.goBack('Home') }}
                                style={{
                                    fontSize: 18,
                                    color: COLORS.backgroundDark,
                                    padding: 12,
                                    backgroundColor: COLORS.white,
                                    borderRadius: 10
                                }} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={product.productImageList ? product.productImageList : null}
                        horizontal
                        renderItem={renderProduct}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0.8}
                        bounces={false}
                        snapToInterval={width}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false },
                        )}
                        keyExtractor={item => item.index}
                    />
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 16,
                        marginTop: 32
                    }}>
                        {
                            product.productImageList
                                ? product.productImageList.map((data, index) => {
                                    let opacity = position.interpolate({
                                        inputRange: [index - 1, index, index + 1],
                                        outputRange: [0.2, 1, 0.2],
                                        extrapolate: 'clamp'
                                    })
                                    return (
                                        <Animated.View
                                            key={index}
                                            style={{
                                                width: '16%',
                                                height: 2.4,
                                                backgroundColor: COLORS.black,
                                                opacity,
                                                marginHorizontal: 4,
                                                borderRadius: 100
                                            }}>

                                        </Animated.View>
                                    )
                                }) : null}
                    </View>
                </View>
                <View style={{
                    paddingHorizontal: 16,
                    marginTop: 14
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 14
                    }}>
                        <Entypo name='shopping-cart' style={{
                            fontSize: 20,
                            color: COLORS.blue,
                            marginRight: 6
                        }} />
                        <Text style={{
                            fontSize: 12,
                            color: COLORS.black
                        }}>
                            Shopping
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 4,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            letterSpacing: 0.5,
                            marginVertical: 4,
                            color: COLORS.black,
                            maxWidth: '84%'
                        }}>
                            {product.productName}
                        </Text>
                        <Ionicons name='link-outline' style={{
                            fontSize: 24,
                            color: COLORS.blue,
                            marginRight: 6,
                            backgroundColor: COLORS.blue + 10,
                            borderRadius: 100,
                        }} />
                    </View>
                    <Text style={{
                        fontSize: 12,
                        color: COLORS.black,
                        fontWeight: '400',
                        letterSpacing: 1,
                        opacity: 0.5,
                        lineHeight: 20,
                        maxWidth: '85%',
                        // maxHeight: 44,
                        marginBottom: 18
                    }}>
                        {product.description}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginVertical: 14,
                        borderBottomColor: COLORS.backgroundLight,
                        borderBottomWidth: 1,
                        paddingBottom: 20
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            width: '80%',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                color: COLORS.blue,
                                backgroundColor: COLORS.backgroundLight,
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 12,
                                borderRadius: 100,
                                marginRight: 10
                            }}>
                                <Entypo name='location-pin' style={{
                                    fontSize: 18,
                                    color: COLORS.blue
                                }} />
                            </View>
                            <Text style={{

                            }}>
                                Audio shop on Borovaya street 8. {'\n'}This shop offer both propducts and services
                            </Text>
                        </View>
                        <Entypo name='chevron-right' style={{
                            fontSize: 22,
                            color: COLORS.backgroundDark,
                        }} />
                    </View>
                    <View style={{
                        paddingHorizontal: 16,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '500',
                            maxWidth: '85%',
                            marginBottom: 4
                        }}> &#8377; {product.productPrice}</Text>
                        <Text>
                            Tax Rate 2%: &#8377; {product.productPrice / 100 * 2}
                            ( &#8377; {(product.productPrice / 100 * 2) + product.productPrice} )
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{
                position: 'relative',
                bottom: 10,
                height: '8%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => product.isAvailable ? addToCart(product.id) : null}
                    style={{
                        width: '86%',
                        height: '90%',
                        backgroundColor: COLORS.blue,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{
                        fontSize: 12,
                        fontWeight: '500',
                        letterSpacing: 1,
                        color: COLORS.white,
                        textTransform: 'uppercase'
                    }}>
                        {product.isAvailable ? 'Add to cart' : 'Not available'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default ProductInfo;
