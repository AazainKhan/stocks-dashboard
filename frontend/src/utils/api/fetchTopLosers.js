const fetchTopLosers = async () => {
  try {
    const response = await fetch('http://localhost:5000/top-losers');
    const data = await response.json();
    if (data && typeof data === 'object' && data !== null) {
      return data;
    } else {
      console.error('Data fetched is not an object:', data);
      return {};
    }
  } catch (error) {
    console.error('Failed to fetch top losers', error);
    return {};
  }
};

export default fetchTopLosers;