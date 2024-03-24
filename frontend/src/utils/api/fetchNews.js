const fetchNews = async () => {
    try {
        const response = await fetch('http://localhost:5000/news');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return JSON.parse(data); // Adjust based on the actual format of the response
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return [];
    }
};

export default fetchNews;
