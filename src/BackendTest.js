import React, { useState, useEffect } from 'react';

function BackendTest() {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => setData(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div>
      <h2>Backend Test</h2>
      {error ? <p>Error: {error}</p> : <p>Backend response: {data}</p>}
    </div>
  );
}

export default BackendTest;
