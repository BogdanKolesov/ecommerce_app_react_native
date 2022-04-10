import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, StatusBar, Dimensions, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, Items } from '../../data/images/data';
import Entypo from 'react-native-vector-icons/Entypo'

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
                            <Entypo name='chevron-left' style={{
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
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default ProductInfo;
