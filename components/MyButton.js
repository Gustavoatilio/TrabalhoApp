import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const MyButton = (props) => {
    return (
        <TouchableOpacity style={style.button} onPress={props.onClick}>
            <Text style={style.button}>{ props.title }</Text>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    button : {
        alignItems: 'center',
        backgroundColor: '#4caf50',
        color: '#ffffff',
        padding: 10,
        marginTop: 16,
        marginHorizontal: 35,

    },
    text: {
        color: '#ffffff'
    }
})
export default MyButton;