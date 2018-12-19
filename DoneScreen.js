import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import Task from './Task';
import { SQLite } from 'expo';
import { store } from './store';

const db = SQLite.openDatabase('kanban');

export default class DoneScreen extends React.Component {
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
              tx.executeSql('select * from todos where todoType = ?', ['done'], (_, { rows }) => {
                this.setState({list: rows._array})
              }, (err) => alert(err));
            },
            (err) => alert(err),
            null
        )
    }

    static navigationOptions = {
        headerTitle: 'Done',
    };
    
    renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskDetailsScreen', item)} >
            <Task {...item} />
        </TouchableOpacity>
    );

    render() {
        return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <FlatList style={{ height: '100%', width: '95%', paddingTop: 10 }}
                data={this.state.list}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => String(item.key)}
            />
        </View>
        );
    }
}


const styles = StyleSheet.create({
    searchField: {
        padding: 10,
    },

});