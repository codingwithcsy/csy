import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState({
    username: '',
    password: '',
    pastPurchases: [],
    preferences: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  function handleAddPurchase(event) {
    event.preventDefault();
    setUser(prevUser => ({
      ...prevUser,
      pastPurchases: [...prevUser.pastPurchases, event.target.value]
    }));
  }

  function handleAddPreference(event) {
    event.preventDefault();
    setUser(prevUser => ({
      ...prevUser,
      preferences: [...prevUser.preferences, event.target.value]
    }));
  }

  function handleSearch(event) {
    event.preventDefault();
    fetch(`/recommendations?search=${searchTerm}`)
      .then(response => response.json())
      .then(data => setRecommendations(data));
  }

  return (
    <div className="App">
      <h1>Welcome to the Personalized Recommendations App</h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" value={user.username} onChange={handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={user.password} onChange={handleInputChange} />
        </label>
        <label>
          Past Purchases:
          <input type="text" name="pastPurchases" value={user.pastPurchases} onChange={handleInputChange} />
          <button onClick={handleAddPurchase}>Add</button>
        </label>
        <label>
          Preferences:
          <input type="text" name="preferences" value={user.preferences} onChange={handleInputChange} />
          <button onClick={handleAddPreference}>Add</button>
        </label>
        <button type="submit" onClick={handleSearch}>Search</button>
      </form>
      {recommendations.length > 0 && (
        <div>
          <h2>Recommendations:</h2>
          <ul>
            {recommendations.map(recommendation => (
              <li key={recommendation.id}>
                <h3>{recommendation.name}</h3>
                <p>{recommendation.description}</p>
                <p>{recommendation.sentiment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
