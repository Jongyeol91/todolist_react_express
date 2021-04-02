import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos: [],
    loading: false,
};
const baseUri = 'http://localhost:4001/todolist';

export const getTodos = createAsyncThunk('todos/getTodos', async () => {
    try {
        const response = await axios.get(baseUri);
        console.log('1', response.data)
        return response.data;
    } catch (e) {
        console.error(e);
    }
})

const todolistSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        create: {
            reducer: (state, {payload}) => {
                state.push({
                    id: payload.id,
                    ref: payload.ref,
                    todo: payload.todo,
                    completed: payload.completed,
                    createdAt: payload.createdAt
                });
            },
        },
        edit: (state, {payload}) => {
            const todoToEdit = state.find(todo => todo.id === payload.id);
            if (todoToEdit) {
                todoToEdit.count = payload.count;
            }
        },
        completed: (state, {payload}) => {
            const todoToCompleted = state.find(todo => todo.id === payload.id);
            if (todoToCompleted) {
                todoToCompleted.completed = payload.completed;
            }
        },
        remove: (state, {payload}) => {
            const index = state.findIndex(todo => todo.id === payload.id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    },
    extraReducers: {
        [getTodos.fulfilled]: (state, {payload}) => {
            console.log(payload)
            state.todos = payload;
            state.loading = false;
        },
        [getTodos.pending]: (state) => {
            state.loading = true;
        },
        [getTodos.rejected]: (state) => {
            state.loading = false;
        }
    }
})

export const {
    create: createCartProductActionCreator,
    edit: editCartProductActionCreator,
    toggle: toggleCartProductActionCreator,
    remove: deleteCartProductActionCreator
} = todolistSlice.actions;

export default todolistSlice;
