import React from "react";
import { View, StyleSheet, Button, Text, TextInput, DatePickerIOS, KeyboardAvoidingView} from "react-native";
import { SQLite } from 'expo';

const db = SQLite.openDatabase('kanban');

export default class AddToDoScreen extends React.Component {
    
    static navigationOptions = {
        headerTitle: 'Create New To Do',
    };
    
    state = { 
        title: '',
        chosenDate: new Date(),
        description: '',
     };

    setDate = (newDate) => {
        this.setState({chosenDate: newDate})
    }

    submitToDo = () => {
        const todo = {
            type: 'todo',
            title: this.state.title,
            dueDate: this.state.chosenDate,
            description: this.state.description
        };
        this.setState({   
                title: '',
                chosenDate: new Date(),
                description: '',
        });
        db.transaction(
            tx => {
              tx.executeSql('insert into todos (todoType, title, dueDate, description) values (?, ?, ?, ?)', 
                [todo.type, todo.title, todo.dueDate, todo.description], null, (err) => alert(err));
            },
            (err) => alert(err),
            () => {
                this.props.navigation.navigate('ToDoScreen')
            }
        )
    }

    render() {
        return (
            <KeyboardAvoidingView style={{flex: 1, justifyContent: "space-evenly" }} behavior="padding" enabled>
            
                <TextInput style={styles.titleInput}
                    placeholder="Title"
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                    multiline={true}
                    blurOnSubmit={true}
                    returnKeyType={'done'}
                />
                <View >
                    <Text style={styles.dateLabel}>Due Date:</Text>
                    <DatePickerIOS
                        mode={'date'}
                        date={this.state.chosenDate}
                        onDateChange={this.setDate}
                    />
                </View>
                <TextInput style={styles.descriptionInput}
                    placeholder="Description..."
                    multiline={true}
                    onChangeText={(description) => this.setState({description})}
                    value={this.state.description}
                    returnKeyType={'done'}
                    blurOnSubmit={true}
                />
                <Button 
                    title={'Confirm'}
                    onPress={this.submitToDo}
                    disabled={!(this.state.title.length > 0)}
                />

            </KeyboardAvoidingView>
        );
    }
}
//<View style={{flex: 1, justifyContent: "space-evenly" }}>

const styles = StyleSheet.create({
    searchField: {
        padding: 10,
    },
    titleInput: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '40%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 22,
    },
    dateLabel: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '40%',
        fontSize: 16,
        color: '#C7C7CD'
    },
    descriptionInput: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '70%',
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 22,
    },
});