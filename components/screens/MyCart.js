import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Items } from '../../data/images/data';


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

    return (
        <View>
            {
                product ? product.map((data, index) => {
                    return (
                        <View style={{ width: '100%' }}>
                            <Image style={{ width: '20%', height: 200 }} source={data.productImage} />
                            <Text>
                                {data.id}.{data.productName}
                            </Text>
                        </View>
                    )
                }) : null
            }
        </View>
    );
}

const styles = StyleSheet.create({})

export default MyCart;
