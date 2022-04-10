import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Items } from '../../data/images/data';

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

    const { productID } = route.params
    return (
        <View>
            <Text>PRODUCT INFO {productID}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default ProductInfo;
