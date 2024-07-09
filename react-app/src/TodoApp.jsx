import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch les todo
  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Erreur rencontrée lors de le fetch du Todo suivant :', error));
  }, []);

  // Créer un nouveau todo
  const addTodo = () => {
    const todo = { title: newTodo, completed: false };
    axios.post('http://localhost:5000/todos', todo)
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('Erreur rencontrée lors de l\'ajout du Todo suivant :', error));
    setNewTodo("");
  };

  // Update un todo
  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    axios.put(`http://localhost:5000/todos/${id}`, { ...todo, completed: !todo.completed })
      .then(response => setTodos(todos.map(t => t.id === id ? response.data : t)))
      .catch(error => console.error('Erreur rencontrée lors de la mise à jour du Todo suivant :', error));
  };

  // Delete un todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => setTodos(todos.filter(t => t.id !== id)))
      .catch(error => console.error('Erreur rencontrée lors de la suppression du Todo suivant :', error));
  };

  return (
    <div className='todoList'>
      <label htmlFor="">Ajouter une nouvelle tâche :</label>
      <div className='CTodo'>
        <input 
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="Nouveau Todo" 
        />
        <button onClick={addTodo}>Ajouter à la liste</button>
      </div>
      <label htmlFor="" className='RUDLabel'>Cliquez sur la liste pour la rayer et mettre à jour son état, puis sur la croix pour supprimer la tâche :</label>
      <ul className='RUDTodo'>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.title}
            </span>
            <button className='deleteButton' onClick={() => deleteTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
