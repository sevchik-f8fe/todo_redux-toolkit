import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        showTodos: [],
        filters: 'SHOW_ALL',
    },
    reducers: {
        filterTodos: (state, action) => {
            switch (action.payload.type) {
                case 'SHOW_ALL': {
                    state.showTodos = state.todos;
                    break;
                } case 'SHOW_COMPLETED': {
                    state.showTodos = state.todos.filter(todo => todo.completed === true);
                    break;
                } case 'SHOW_UNCOMPLETED': {
                    state.showTodos = state.todos.filter(todo => todo.completed === false);
                    break;
                } default: {
                    state.showTodos = state.showTodos;
                    break;
                }
            }
        },
        addTodo: (state, action) => {
            state.todos.push({
                id: new Date().toISOString(),
                value: action.payload.value,
                completed: false,
            });

            state.showTodos = state.todos;
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);

            state.showTodos = state.todos;
        },
        toggleTodo: (state, action) => {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);

            toggledTodo.completed = !toggledTodo.completed;

            state.showTodos = state.todos;
        },
    },
})

export const { filterTodos, addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;