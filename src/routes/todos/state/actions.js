export function addTodo(label) {
    return {
        type: 'Todos.ADD_TODO',
        id: (Math.random() * Math.pow(10, 20)).toString(36),
        label,
    };
}

export function toggleTodo(id) {
    return {
        type: 'Todos.TOGGLE_TODO',
        id,
    };
}

export function removeTodo(id) {
    return {
        type: 'Todos.REMOVE_TODO',
        id,
    };
}
