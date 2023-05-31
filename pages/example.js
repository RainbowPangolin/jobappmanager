import React, { useState, useEffect } from 'react';

export default function Home() {

  const [pee, setPee] = useState('asdf');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${window.location.origin}/api/mockdb/db`);
        const data = await response.json();
        setTimeout(() => {
          console.log('wait...')
          setPee(JSON.stringify(data));
        }, 1000)
        console.log(data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>{pee}</div>
  );
}
