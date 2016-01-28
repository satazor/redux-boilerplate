const findIndex = require('lodash/findIndex');

function addTodo(state, action) {
    return [...state, {
        id: action.id,
        label: action.label,
        completed: false,
    }];
}

function toggleTodo(state, action) {
    const index = findIndex(state, { id: action.id });
    const todo = state[index];

    if (!todo) {
        return state;
    }

    return [
        ...state.slice(0, index),
        {
            ...todo,
            completed: !todo.completed,
        },
        ...state.slice(index + 1),
    ];
}

function removeTodo(state, action) {
    const index = findIndex(state, { id: action.id });

    if (index === -1) {
        return state;
    }

    return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
    ];
}

export function todosReducer(state = [], action) {
    switch (action.type) {
    case 'Todos.ADD_TODO':
        return addTodo(state, action);
    case 'Todos.TOGGLE_TODO':
        return toggleTodo(state, action);
    case 'Todos.REMOVE_TODO':
        return removeTodo(state, action);
    default:
        return state;
    }
}

export default {
    todos: todosReducer,
};
