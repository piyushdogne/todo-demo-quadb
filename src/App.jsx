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
    <div className='container h-screen bg-zinc-600 w-full'>
    <div className="mx-auto pt-10 w-1/3 sm:w-2/3 xs:w-full xs:px-4 md1:w-full md2:w-full">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
     
     <div className='flex lg:flex-row gap-4 w-full sm:flex-col xs:flex-col md:flex md:w-full'>
      <input
        type="text"
        className=" field border border-gray-300 p-2 rounded-md mb-4 3xl:w-full w-full focus:outline-none "
        placeholder="Add a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTodo();
          }
        }}
        />
      <button
        className="buttons bg-blue-500 text-white px-4 py-2 rounded-md h-[2.7rem] sm:w-full md:w-[14rem]"
        onClick={handleAddTodo}
        >
        Add Todo
      </button>
    </div>
      <ul className="mt-4 xs:text-xs">
        {todos.map(todo => (
          <li
          key={todo.id}
          className={`flex bg-slate-50  w-full mt-5 bg-opacity-20 p-4 xs:p-3 rounded-md items-center justify-between ${
            todo.completed ? 'line-through text-gray-500' : ''
          }`}
          >
            <div className='max-w-30 h-auto overflow-hidden text-wrap flex'>{todo.text}</div>
            <div className='xs:flex'>
              <button
                className="buttons mr-4 bg-slate-50 bg-opacity-5 text-white p-1 rounded-md xs:h-10 xs:mt-0"
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
