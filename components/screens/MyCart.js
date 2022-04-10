import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Items } from '../../data/images/data';

const MyCart = () => {
    return (
        <View>
            {
                Items.map(data => (
                    <Text key={data.id}>{data.id} {data.productName}</Text>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({})

export default MyCart;
