// /frontend/utils/api/fetchTickerNews.js

const BACKEND_URL = 'http://localhost:5000';

export async function fetchTickerNews(ticker) {
    try {
        const response = await fetch(`${BACKEND_URL}/news/${ticker}`);
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

export default fetchTickerNews;