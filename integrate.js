import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  // Handle user creation and input of past purchases and preferences
  const handleUserSubmit = (userData) => {
    axios.post('/api/users', userData)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle search for products and display recommendations
  const handleSearchSubmit = () => {
    axios.get(`/api/recommendations/${user.id}?searchTerm=${searchTerm}`)
      .then((response) => {
        setRecommendations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Render user input form and search form
  return (
    <div>
      {!user && (
        <div>
          <h2>Create Account</h2>
          <form onSubmit={(event) => {
            event.preventDefault();
            const userData = {
              name: event.target.name.value,
              pastPurchases: event.target.pastPurchases.value,
              preferences: event.target.preferences.value
            };
            handleUserSubmit(userData);
          }}>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <br />
            <label>
              Past Purchases:
              <input type="text" name="pastPurchases" />
            </label>
            <br />
            <label>
              Preferences:
              <input type="text" name="preferences" />
            </label>
            <br />
            <button type="submit">Create Account</button>
          </form>
        </div>
      )}
      {user && (
        <div>
          <h2>Search for Products</h2>
          <form onSubmit={(event) => {
            event.preventDefault();
            handleSearchSubmit();
          }}>
            <label>
              Search Term:
              <input type="text" name="searchTerm" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
            </label>
            <br />
            <button type="submit">Search</button>
          </form>
          <h2>Recommendations</h2>
          <ul>
            {recommendations.map((product) => (
              <li key={product.id}>
                {product.name} ({product.description})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
