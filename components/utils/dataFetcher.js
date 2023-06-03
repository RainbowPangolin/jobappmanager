export const fetchData = async () => {
	try {
		const response = await fetch(`${window.location.origin}/api/mockdb/db`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};