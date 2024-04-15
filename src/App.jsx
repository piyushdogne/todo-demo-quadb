import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './todoSlice';
import {useEffect} from 'react'
const App = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (!storedTodos || JSON.parse(storedTodos).length === 0) {
      dispatch(addTodo('Greetings! Team QuadB Tech :)'));
      setNewTodo('');
    }
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className='h-screen m-0 w-screen bg-zinc-500'>
    <div className="mx-auto pt-10 relative w-1/3">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
     
     <div className='flex gap-4 w-full'>
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-md w- mb-4 w-[24rem]"
        placeholder="Add a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        />
      <button
        className="buttons bg-blue-500 text-white px-4 py-2 rounded-md h-[2.7rem]"
        onClick={handleAddTodo}
        >
        Add Todo
      </button>
    </div>
      <ul className="mt-4">
        {todos.map(todo => (
          <li
          key={todo.id}
          className={`flex bg-slate-50 mt-5 bg-opacity-20 p-4 rounded-md items-center justify-between ${
            todo.completed ? 'line-through text-gray-500' : ''
          }`}
          >
            <span>{todo.text}</span>
            <div>
              <button
                className="buttons mr-4 bg-slate-50 bg-opacity-5 text-white p-1 rounded-md"
                onClick={() => handleToggleTodo(todo.id)}
              >
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button className='buttons bg-red-500 bg-opacity-80 text-white p-1 rounded-md' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
        </div>
    </div>
  );
};

export default App;
