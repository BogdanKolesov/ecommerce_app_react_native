import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, Items } from '../../data/images/data';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Home = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [accessory, setAccessory] = useState([]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        });

        return unsubscribe;
    }, [navigation]);

    //get data from DB

    const getDataFromDB = () => {
        let productList = [];
        let accessoryList = [];
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].category == 'product') {
                productList.push(Items[index]);
            } else if (Items[index].category == 'accessory') {
                accessoryList.push(Items[index]);
            }
        }

        setProducts(productList);
        setAccessory(accessoryList);
    };

    const ProductCard = ({ data }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductInfo', { productID: data.id })}
                style={{
                    width: '48%',
                    marginVertical: 14,
                }}>
                <View
                    style={{
                        width: '100%',
                        height: 100,
                        borderRadius: 10,
                        backgroundColor: COLORS.backgroundLight,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 8,
                    }}>
                    {data.isOff ? (
                        <View
                            style={{
                                position: 'absolute',
                                width: '20%',
                                height: '24%',
                                backgroundColor: COLORS.green,
                                top: 0,
                                left: 0,
                                borderTopLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: COLORS.white,
                                    fontWeight: 'bold',
                                    letterSpacing: 1,
                                }}>
                                {data.offPercentage}%
                            </Text>
                        </View>
                    ) : null}
                    <Image
                        source={data.productImage}
                        style={{
                            width: '80%',
                            height: '80%',
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <Text
                    style={{
                        fontSize: 12,
                        color: COLORS.black,
                        fontWeight: '600',
                        marginBottom: 2,
                    }}>
                    {data.productName}
                </Text>
                {data.category == 'accessory' ? (
                    data.isAvailable ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <FontAwesome
                                name="circle"
                                style={{
                                    fontSize: 12,
                                    marginRight: 6,
                                    color: COLORS.green,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: COLORS.green,
                                }}>
                                Available
                            </Text>
                        </View>
                    ) : (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <FontAwesome
                                name="circle"
                                style={{
                                    fontSize: 12,
                                    marginRight: 6,
                                    color: COLORS.red,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: COLORS.red,
                                }}>
                                Unavailable
                            </Text>
                        </View>
                    )
                ) : null}
                <Text>&#8377; {data.productPrice}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.viewStyles}>

            <StatusBar style={styles.statusBarStyles} barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentViewStyles}>
                    <TouchableOpacity>
                        <Entypo name='shopping-bag' style={styles.shoppingCardIconStyles} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='cart' style={styles.shoppingCardIconStyles} />
                    </TouchableOpacity>
                </View>
                <View style={styles.shoppingTitlesStyles}>
                    <Text style={styles.headingTextStyles}>
                        Hi-fi Shop & Service
                    </Text>
                    <Text style={styles.descriptionTextStyles}>
                        Audio shop on Borovaya street 8. {'\n'}This shop offer both propducts and services
                    </Text>
                </View>
                <View style={{ width: '100%', padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={styles.infoTitleStyles}>
                        <Text style={styles.textTitleStyles}>Products</Text>
                        <Text style={styles.textSubTitleStiles}>41</Text>
                    </View>
                    <Text style={styles.titleButtonStyles}>See All</Text>
                </View>
                <View >
                    {
                        products.map(data => (
                            <ProductCard data={data} key={data.id} />
                        ))
                    }
                </View>
            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    viewStyles: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.white,
        paddingTop: '8%',
        paddingHorizontal: '3%'
    },
    statusBarStyles: {
        backgroundColor: COLORS.white,
    },
    contentViewStyles: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    shoppingCardIconStyles: {
        fontSize: 18,
        color: COLORS.backgroundMedium,
        padding: 12,
        backgroundColor: COLORS.backgroundLight
    },
    shoppingTitlesStyles: {
        width: '100%',
        marginBottom: 10,
        padding: 16
    },
    headingTextStyles: {
        fontSize: 26,
        color: COLORS.black,
        fontWeight: '400',
        letterSpacing: 1,
        marginBottom: 10
    },
    descriptionTextStyles: {
        fontSize: 14,
        color: COLORS.black,
        fontWeight: '400',
        letterSpacing: 1,
        marginBottom: 10,
        lineHeight: 24
    },
    textTitleStyles: {
        fontSize: 18,
        color: COLORS.black,
        fontWeight: '600',
        letterSpacing: 1

    },
    textSubTitleStiles: {
        fontSize: 14,
        color: COLORS.black,
        fontWeight: '400',
        opacity: 0.5,
        marginLeft: 10
    },
    shoppingViewStyle: {

    },
    infoTitleStyles: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    titleButtonStyles: {
        fontSize: 14,
        color: COLORS.blue,
        fontWeight: '400',
    }
})

export default Home;
