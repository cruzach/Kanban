import {combineReducers} from 'redux';
import {ADD_TODO} from './actions';

const todoReducer = ( state = [], action) => {
    if (action.type === ADD_TODO) {return [...state, action.payload];}

    return state;
}


const reducer = combineReducers({
    addTodo: todoReducer,
});

export default reducer;