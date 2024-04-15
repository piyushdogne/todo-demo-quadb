import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('todos') || '[]');

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const id = Date.now();
      state.push({ id, text: action.payload, completed: false });
      localStorage.setItem('todos', JSON.stringify(state));
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(state));
      }
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(state));
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
