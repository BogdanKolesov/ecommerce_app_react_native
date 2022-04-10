import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, Items } from '../../data/images/data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const MyCart = ({ navigation }) => {
    const [product, setProduct] = useState();
    const [total, setTotal] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => (
            getDataFromDB()
        ))
        return unsubscribe
    }, [navigation]);


    const getDataFromDB = async () => {
        let items = await AsyncStorage.getItem('cartItems');
        items = JSON.parse(items);
        let productData = [];
        if (items) {
            Items.forEach(data => {
                if (items.includes(data.id)) {
                    productData.push(data);
                    return;
                }
            });
            setProduct(productData);
            getTotal(productData);
        } else {
            setProduct(false);
            getTotal(false);
        }
    };


    const getTotal = (productData) => {
        let total = 0
        for (let index = 0; index < productData.length; index++) {
            let productPrice = productData[index].productPrice
            total = total + productPrice
        }
        setTotal(total)
    }

    const removeItemFromCart = (id) => {
        console.log(id)
    }

    const renderProducts = (data, index) => {
        return (
            <TouchableOpacity key={index} style={{
                width: '100%',
                height: 120,
                marginVertical: 6,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <View style={{
                    width: '30%',
                    height: 100,
                    padding: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.backgroundLight,
                    borderRadius: 10,
                    marginRight: 22
                }}>
                    <Image source={data.productImage}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain'
                        }}
                    />
                </View>
                <View style={{
                    flex: 1,
                    height: '100%',
                    justifyContent: 'space-around'
                }}>
                    <View style={{

                    }}>
                        <Text
                            onPress={() => navigation.navigate('Home')}
                            style={{
                                fontSize: 16,
                                maxWidth: '100%',
                                color: COLORS.black,
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}>
                            {data.productName}
                        </Text>
                        <View style={{
                            marginTop: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                            opacity: 0.6
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '400',
                                maxWidth: '85%',
                                marginRight: 4
                            }}>
                                &#8377; {data.productPrice}
                            </Text>
                            <Text>
                                (&#8377;{(data.productPrice / 100 * 2) + data.productPrice})
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }} >
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                borderRadius: 100,
                                marginRight: 20,
                                padding: 4,
                                borderWidth: 1,
                                borderColor: COLORS.backgroundMedium,
                                opacity: 0.5
                            }}>
                                <MaterialCommunityIcons name='minus' style={{
                                    fontSize: 16,
                                    color: COLORS.backgroundDark,
                                }} />
                            </View>
                            <Text>1</Text>
                            <View style={{
                                borderRadius: 100,
                                marginLeft: 20,
                                padding: 4,
                                borderWidth: 1,
                                borderColor: COLORS.backgroundMedium,
                                opacity: 0.5
                            }}>
                                <MaterialCommunityIcons name='plus' style={{
                                    fontSize: 16,
                                    color: COLORS.backgroundDark,
                                }} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
                            <MaterialCommunityIcons name='delete-outline'
                                style={{
                                    fontSize: 20,
                                    color: COLORS.backgroundDark,
                                    backgroundColor: COLORS.backgroundLight,
                                    padding: 8,
                                    borderRadius: 100,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity >
        )
    }

    return (
        <View style={{
            paddingTop: '7%',
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.white
        }}>
            <ScrollView>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingTop: 16,
                    paddingHorizontal: 16,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <MaterialCommunityIcons name='chevron-left'
                            style={{
                                fontSize: 22,
                                color: COLORS.backgroundDark,
                                backgroundColor: COLORS.backgroundLight,
                                borderRadius: 12,
                                padding: 12
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 18,
                        color: COLORS.black,
                        fontWeight: '400',

                    }}>Order Details</Text>
                    <View>

                    </View>
                </View>
                <Text style={{
                    fontSize: 20,
                    color: COLORS.black,
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    paddingTop: 20,
                    paddingLeft: 16,
                    paddingBottom: 10
                }}>My Cart</Text>
                <View style={{
                    paddingHorizontal: 16,

                }}>
                    {
                        product ? product.map(renderProducts) : null
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default MyCart;
