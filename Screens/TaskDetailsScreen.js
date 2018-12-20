import React from "react";
import { View, Text, StyleSheet, Button} from "react-native";
import { SQLite } from 'expo';

const db = SQLite.openDatabase('kanban');

export default class TaskDetailsScreen extends React.Component {
    
    static navigationOptions = {
        headerTitle: 'Task Details',
    };
    
    moveToDoing = () => {
        db.transaction(
            tx => {
              tx.executeSql(`update todos set todoType = ? where key = ?`, ['doing',this.props.navigation.getParam('key')]);
            },
            (err) => alert(err),
            () => {
                this.props.navigation.goBack();
                this.props.navigation.navigate('DoingScreen')
            }
        );
    }

    moveToDone = () => {
        db.transaction(
            tx => {
              tx.executeSql(`update todos set todoType = ? where key = ?`, ['done',this.props.navigation.getParam('key')]);
            },
            (err) => alert(err),
            () => {
                this.props.navigation.goBack();
                this.props.navigation.navigate('DoneScreen')
            }
        );
    }

    deleteTodo = () => {
        db.transaction(
            tx => {
              tx.executeSql(`DELETE FROM todos where key = ?`, [this.props.navigation.getParam('key')]);
            },
            (err) => alert(err),
            () => {
                this.props.navigation.goBack();
            }
        );
    }

    render() {
        const {navigation} = this.props;

        return (
            <View>
                <View style={[styles.container, styles[navigation.getParam('todoType')]]}>
                    <Text style={styles.title}>{navigation.getParam('title')}</Text>
                    <Text style={styles.dueDate}>Done by: {new Date(navigation.getParam('dueDate')).toDateString()}</Text>
                    <Text style={styles.details}>{navigation.getParam('description')}</Text>
                </View>
                {(navigation.getParam('todoType') === 'todo' && 
                    <Button 
                        title={'Move to "Doing"'}
                        onPress={this.moveToDoing}
                    />
                )}
                {(navigation.getParam('todoType') !== 'done' && 
                    <Button 
                        title={'Move to "Done"'}
                        onPress={this.moveToDone}
                    />
                )}
                <Button 
                    title={'Delete'}
                    onPress={this.deleteTodo}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center", 
        justifyContent: "center",
        margin: 20,
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 32,
        color: 'white',
        textAlign: 'center',
    },
    dueDate: {
        fontSize: 18,
        color: 'white'
    },
    details: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 18,
        color: 'white'
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