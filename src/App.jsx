import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  const addTodo = (todo, deadline) => setTodos([...todos, { text: todo, completed: false, deadline }]);
  const removeTodo = index => setTodos(todos.filter((_, i) => i !== index));
  const toggleTodo = index => setTodos(todos.map((todo, i) => i === index ? { ...todo, completed: !todo.completed } : todo));

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'incomplete') {
      return !todo.completed;
    } else {
      return true;
    }
  });

  const darkModeStyles = {
    backgroundColor: darkMode ? '#333' : '#FFF',
    color: darkMode ? '#FFF' : '#333'
  };

  return (
    <div style={{ ...darkModeStyles, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h1>Lista de To-Do</h1>
        <div>
          <button onClick={() => setFilter('all')}>Todos</button>
          <button onClick={() => setFilter('completed')}>Completados</button>
          <button onClick={() => setFilter('incomplete')}>Incompletos</button>
          <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? 'Modo Día' : 'Modo Noche'}</button>
        </div>
        {filteredTodos.map((todo, index) => (
          <div key={index}>
            <span style={{ ...darkModeStyles, textDecoration: todo.completed ? 'line-through' : '' }}>{todo.text}</span>
            <span onClick={() => removeTodo(index)} role="img" aria-label="Eliminar">❌</span>
            <span onClick={() => toggleTodo(index)} role="img" aria-label={todo.completed ? 'Desmarcar' : 'Marcar como completado'}>{todo.completed ? '✅' : '🔲'}</span>
            <span>{todo.deadline}</span>
          </div>
        ))}
        <form onSubmit={e => { 
          e.preventDefault(); 
          const todo = e.target.elements.todo.value;
          const deadline = e.target.elements.deadline.value;
          addTodo(todo, deadline); 
          e.target.reset(); 
        }}>
          <input name="todo" type="text" placeholder="Añadir to-do" required />
          <input name="deadline" type="date" required />
          <button type="submit" aria-label="Añadir"><span role="img" aria-label="Añadir">➕</span></button>
        </form>
      </div>
    </div>
  );
}

export default App;