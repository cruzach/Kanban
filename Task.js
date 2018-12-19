import React from 'react'
import {StyleSheet, Text, View } from 'react-native'

const Task = props => (
        <View style={[styles.row, styles[props.todoType]]}>
            <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
            <Text style={styles.dueDate}>Done by: {new Date(props.dueDate).toDateString()}</Text>
        </View>
);

const styles = StyleSheet.create({
    row: {
        padding: 20,
        flexDirection: 'row',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10,
        
    },
    title: {
        fontSize: 18,
        paddingRight: 10,
        color: 'white',
        width: '70%',
    },
    dueDate: {
        fontSize: 10,
        color: 'white',
        width: '30%',
        textAlign: 'center',
    },
    todo: {
        backgroundColor: '#258039',
    },
    doing: {
        backgroundColor: '#f5be41',
    },
    done: {
        backgroundColor: '#31a9b8',
    },
});

export default Task;