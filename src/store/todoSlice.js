import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

            if (!response.ok) {
                throw new Error('Incorrect JSON.');
            }

            return await response.json();
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async ({ id }, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Can't delete task. Server Error.");
            }

            dispatch(removeTodo({ id }));

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async ({ id }, { rejectWithValue, dispatch, getState }) => {
        const todo = getState().todos.todos.find(todo => todo.id === id);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...todo,
                    completed: !todo.completed,
                })
            });

            if (!response.ok) {
                throw new Error("Can't toggle task. Server Error.");
            }

            dispatch(toggleTodo({ id }));

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async ({ title }, { rejectWithValue, dispatch }) => {
        try {
            const todo = {
                title: title,
                userId: 1,
                completed: false,
            };

            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            });

            if (!response.ok) {
                throw new Error("Can't create task. Server Error.");
            }

            const data = await response.json();

            dispatch(addTodo({ data }));

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const setError = (state, action) => {
    state.status = 'REJECTED';
    state.error = action.payload;
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        showTodos: [],
        status: null,
        error: null,
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
            state.todos.push(action.payload.data);
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'LOADING';
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'RESOLVED';
                state.todos = action.payload;
                state.showTodos = state.todos;
            })
            .addCase(fetchTodos.rejected, setError)
            .addCase(deleteTodo.rejected, setError)
            .addCase(toggleStatus.rejected, setError)
            .addCase(createTodo.rejected, setError)
    },
})

export const { filterTodos, addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;