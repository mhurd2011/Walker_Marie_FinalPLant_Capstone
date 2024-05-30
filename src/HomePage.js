import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [plants, setPlants] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/plants');
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };
    fetchPlants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/plants', {
        name,
        description,
      });
      setPlants([...plants, response.data]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  return (
    <div>
      <h1>Plants</h1>
      <ul>
        {plants.map((plant) => (
          <li key={plant._id}>
            {plant.name}: {plant.description}
          </li>
        ))}
      </ul>
      <h2>Add a New Plant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
};

export default HomePage;
