import Header from './Header';
import Footer from './Footer';
import { decodeJwt } from 'jose'; 
import { useState, useEffect } from 'react'; // React hooks

const Profile = () => {
  // Get the token from localStorage
  const token = localStorage.getItem('token');
  let email = '';

  // Decode the token to get the email
  try {
    if (token) {
      const decodedToken = decodeJwt(token);
      email = decodedToken.email;
    }
  } catch (err) {
    console.error('Error decoding token:', err);
  }

  // To-Do app state
  const loadTodos = () => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  const [todos, setTodos] = useState(loadTodos()); // Initialize todos from localStorage
  const [newTodo, setNewTodo] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header email={email} /> {/* Pass decoded email */}
      
      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <p>Here is some random profile content that can be updated later.</p>

        {/* To-Do App Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Your To-Do List</h3>

          {/* To-Do Input */}
          <div className="mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Add a new task"
            />
            <button
              onClick={handleAddTodo}
              className="mt-2 w-full bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600"
            >
              Add Todo
            </button>
          </div>

          {/* To-Do List */}
          <ul className="space-y-2">
            {todos.map((todo, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded shadow">
                <span>{todo}</span>
                <button
                  onClick={() => handleDeleteTodo(index)}
                  className="text-cyan-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default Profile;
