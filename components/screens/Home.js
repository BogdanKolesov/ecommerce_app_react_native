import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../data/images/data';
import Entypo from 'react-native-vector-icons/Entypo'

const Home = () => {
    return (
        <View style={styles.viewStyles}>
            <StatusBar style={styles.statusBarStyles} barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentViewStyles}>
                    <TouchableOpacity>
                        <Entypo name='shopping-bag' />
                    </TouchableOpacity>
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
    },
    statusBarStyles: {
        backgroundColor: COLORS.white,
    },
    contentViewStyles: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default Home;
