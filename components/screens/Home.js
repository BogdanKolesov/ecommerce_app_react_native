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
            <TouchableOpacity>
                <Text>
                    {data.productName}
                </Text>
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
