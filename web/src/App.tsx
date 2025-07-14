import React, { useState } from 'react';
import useTodos from './hooks/useTodos';
import TodoItem from './components/TodoItem';

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const [input, setInput] = useState('');

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Todo App</h1>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTodo(input);
              setInput('');
            }
          }}
        />
        <button onClick={() => { addTodo(input); setInput(''); }}>
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>
    </div>
  );
}