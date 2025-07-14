import React, { useState } from 'react';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <li style={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: '8px 0',
      borderBottom: '1px solid #eee'
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: '8px' }}
      />
      
      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            style={{ flex: 1, marginRight: '8px' }}
            autoFocus
          />
          <button onClick={handleSave} style={{ marginRight: '4px' }}>
            Save
          </button>
          <button onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            style={{
              flex: 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#888' : '#000'
            }}
          >
            {todo.text}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            style={{ marginRight: '4px' }}
          >
            Edit
          </button>
          <button onClick={() => onDelete(todo.id)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}