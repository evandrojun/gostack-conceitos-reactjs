import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const newRepo = {
      title: `Novo repository - ${Date.now()}`,
      url: 'https://github.com/',
      techs: ['ReactJS']
    };

    const response = await api.post('repositories', newRepo);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const filteredRepos = repositories.filter(repo => repo.id !== id);

    await api.delete(`repositories/${id}`);

    setRepositories(filteredRepos);
  }

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
