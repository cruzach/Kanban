import React from 'react';
import { SQLite } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import ToDoScreen from './ToDoScreen';
import AddToDoScreen from './AddToDoScreen';
import TaskDetailsScreen from './TaskDetailsScreen';
import DoingScreen from './DoingScreen';
import DoneScreen from './DoneScreen';
import { Provider } from 'react-redux'
import { store } from './store';

const db = SQLite.openDatabase('kanban');

const ToDoStack = createStackNavigator(
  {
    ToDoScreen,
    TaskDetailsScreen,
  },
  {
    initialRouteName: "ToDoScreen",
  }
);

const DoingStack = createStackNavigator(
  {
    DoingScreen,
    TaskDetailsScreen,
  },
  {
    initialRouteName: "DoingScreen",
  }
);

const DoneStack = createStackNavigator(
  {
    DoneScreen,
    TaskDetailsScreen,
  },
  {
    initialRouteName: "DoneScreen",
  }
);

const AddToDo = createStackNavigator(
  {
    AddToDoScreen,
  },
  {
    initialRouteName: "AddToDoScreen",
  }
);

const TabNavigator = createBottomTabNavigator({
    ToDo: ToDoStack,
    Doing: DoingStack,
    Done: DoneStack,
    Add: AddToDo,
  },
  {
    initialRouteName: 'ToDo',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'ToDo') {
          iconName = `ios-rocket`;
        } else if (routeName === 'Doing') {
          iconName = `ios-hourglass`;
        } else if (routeName === 'Done') {
          iconName = `ios-checkmark-circle-outline`;
        } else if (routeName === 'Add') {
          iconName = `ios-add`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
  }
);

const AppNavigator = createAppContainer(TabNavigator);

export default class App extends React.Component {
  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists todos(key integer primary key AUTOINCREMENT, todoType text, title text, dueDate text, description text);'
      );
    });
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}