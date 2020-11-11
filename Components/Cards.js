import React from 'react';
import { View, StyleSheet } from 'react-native';



const Cards = (props) => {
    // return <View style={styles.card}>{props.children}</View>
    //applying both own scomponent styles and Props styles  
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>

};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 10,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10
    }
});

export default Cards;