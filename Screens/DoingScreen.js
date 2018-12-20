import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import Task from './Task';
import { SQLite } from 'expo';
import { store } from '../Redux/store';

const db = SQLite.openDatabase('kanban');

export default class DoingScreen extends React.Component {
    state = {
        list: store.getState().list,
    };

    componentDidMount() {
        this.getTodos();
    }
    
    componentDidUpdate() {
        this.getTodos();
    }

    getTodos = () => {
        db.transaction(
            tx => {
              tx.executeSql('select * from todos where todoType = ?', ['doing'], (_, { rows }) => {
                this.setState({list: rows._array})
              }, (err) => alert(err));
            },
            (err) => alert(err),
            null
        );
    }

    static navigationOptions = {
        headerTitle: 'Doing',
    };
    
    renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskDetailsScreen', item)} >
            <Task {...item} />
        </TouchableOpacity>
    );

    render() {
        return (
        <View style={styles.container}>
            <FlatList style={styles.list}
                data={this.state.list}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => String(item.key)}
            />
        </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center", 
        justifyContent: "center"
    },
    list: {
        height: '100%', 
        width: '95%', 
        paddingTop: 10
    },
});