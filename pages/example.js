import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${window.location.origin}/api/mockdb/db`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div>Poo</div>;
}
