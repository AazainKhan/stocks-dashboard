// fetchHistoricalData.js
const fetchHistoricalData = async (ticker) => {
    try {
        const response = await fetch(`http://localhost:5000/historical/${ticker}`);
        if (!response.ok) {
            throw new Error('Failed to fetch historical data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching historical data:', error);
        return [];
    }
};

export default fetchHistoricalData;
