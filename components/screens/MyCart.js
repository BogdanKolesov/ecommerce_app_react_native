import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, Items } from '../../data/images/data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'



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

    const checkOut = async () => {
        try {
            await AsyncStorage.removeItem('cartItems')
        } catch (error) {
            return error
        }
        ToastAndroid.show('Products will be deliverd soon', ToastAndroid.SHORT)
        navigation.navigate('Home')
    }



    const getTotal = (productData) => {
        let total = 0
        for (let index = 0; index < productData.length; index++) {
            let productPrice = productData[index].productPrice
            total = total + productPrice
        }
        setTotal(total)
    }

    const removeItemFromCart = async id => {
        let itemArray = await AsyncStorage.getItem('cartItems')
        itemArray = JSON.parse(itemArray)
        if (itemArray) {
            let array = itemArray
            for (let index = 0; index < array.length; index++) {
                if (array[index] == id) {
                    array.splice(index, 1)
                }
                await AsyncStorage.setItem('cartItems', JSON.stringify(array))
                getDataFromDB()
            }
        }
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
                            onPress={() => navigation.navigate('ProductInfo', { productID: data.id })}
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
                {
                    total == 0
                        ? (<View style={{
                            paddingHorizontal: 20,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                            }}>Cart is empty</Text>
                            <Entypo name='emoji-sad' style={{
                                fontSize: 80,
                                color: COLORS.backgroundDark,
                                marginTop: 5,
                                marginBottom: 3
                            }}
                            />
                        </View>)
                        : <View style={{
                            paddingHorizontal: 16,
                        }}>
                            {
                                product ? product.map(renderProducts) : null
                            }
                        </View>
                }
                <View>
                    <View style={{
                        paddingHorizontal: 16,
                        marginVertical: 16
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 20
                        }}>
                            Delivery location
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
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
                                    borderRadius: 10,
                                    marginRight: 10
                                }}>
                                    <MaterialCommunityIcons
                                        name='truck-delivery'
                                        style={{
                                            fontSize: 18,
                                            color: COLORS.blue
                                        }}
                                    />
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: COLORS.black,
                                            fontWeight: '400',
                                            lineHeight: 20
                                        }}
                                    >
                                        Saint-Petersburg, Borovaya st 8
                                    </Text>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.black,
                                        fontWeight: '400',
                                        lineHeight: 20,
                                        opacity: 0.5
                                    }}>
                                        Free Russia
                                    </Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons
                                name='chevron-right'
                                style={{
                                    fontSize: 22,
                                    color: COLORS.black
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{
                        paddingHorizontal: 16,
                        marginVertical: 16
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 20
                        }}>
                            Payment Method
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
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
                                    borderRadius: 10,
                                    marginRight: 10
                                }}>
                                    <Text style={{
                                        fontSize: 10,
                                        fontWeight: 'bold',
                                        color: COLORS.blue,
                                        letterSpacing: 1,
                                        opacity: 0.5
                                    }}>
                                        MIR
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: COLORS.black,
                                            fontWeight: '400',
                                            lineHeight: 20
                                        }}
                                    >
                                        MIR Free Russia
                                    </Text>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.black,
                                        fontWeight: '400',
                                        lineHeight: 20,
                                        opacity: 0.5
                                    }}>
                                        ****-****-****-****-1234
                                    </Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons
                                name='chevron-right'
                                style={{
                                    fontSize: 22,
                                    color: COLORS.black
                                }}
                            />
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: 16,
                        marginTop: 40,
                        marginBottom: 88,
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 20
                        }}>
                            Order Info
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 2
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '400',
                                maxWidth: '80%',
                                color: COLORS.black,
                                opacity: 0.5
                            }}>Subtotal</Text>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: '400',
                                color: COLORS.black,
                                opacity: 0.8
                            }}>
                                &#8377; {total}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 2
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '400',
                                maxWidth: '80%',
                                color: COLORS.black,
                                opacity: 0.5
                            }}>Taxes</Text>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: '400',
                                color: COLORS.black,
                                opacity: 0.8,
                            }}>
                                &#8377; {total / 100 * 2}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                                maxWidth: '80%',
                                color: COLORS.black,
                                opacity: 0.5
                            }}>Total</Text>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '500',
                                color: COLORS.black,
                                opacity: 0.8
                            }}>
                                &#8377; {total + (total / 100 * 2)}
                            </Text>
                        </View>
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
                <TouchableOpacity onPress={total !== 0 ? checkOut : null}
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
                        Checkout &#8377;{total + (total / 100 * 2)}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default MyCart;
