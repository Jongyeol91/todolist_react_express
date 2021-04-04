import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos: [],
    loading: false,
    error: null
};
const baseUri = 'http://localhost:4001/todolist';

export const getTodos = createAsyncThunk('todos/getTodos', async () => {
        const response = await axios.get(baseUri);
        return response.data;
})

export const createTodo = createAsyncThunk('todos/createTodo', async (data) => {
    console.log(data)
        const response = await axios.post(baseUri, {
            todo: data.todo,
            ref: [...data.ref],
            completed: data.completed
        })
        return response.data;
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (data) => {
    const response = await axios.delete(`${baseUri}?id=${data.id}`);
    return response.data;
})

export const completeTodo = createAsyncThunk('todos/completeTodo', async (data) => {
    const response = await axios.put(baseUri, { id: data.id, completed: data.completed ? 1 : 0 });
    return response.data;
})

const todolistSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => builder
        .addCase(getTodos.fulfilled, (state, action ) => {
            state.todos = action.payload;
            state.loading = false;
            state.error = false;
        })
        .addCase(getTodos.rejected, (state ) => {
            state.loading = false;
            state.error = true
        })
        .addCase(createTodo.fulfilled, (state, action ) => {
            state.loading = false;
            state.error = false;
        })
        .addCase(createTodo.rejected, (state ) => {
            state.loading = false;
            state.error = true
        })
        .addCase(deleteTodo.fulfilled, (state, action ) => {
            state.loading = false;
            state.error = false;
        })
        .addCase(deleteTodo.rejected, (state ) => {
            state.loading = false;
            state.error = true
        })
        .addCase(completeTodo.fulfilled, (state, action ) => {
            state.loading = false;
            state.error = false;
        })
        .addCase(completeTodo.rejected, (state ) => {
            state.loading = false;
            state.error = true
        })
        .addMatcher((action) => {
            return action.type.includes('/pending');
        }, (state, action) => {
            state.loading = true;
        })
})

export default todolistSlice;
