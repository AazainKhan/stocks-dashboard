import { useState, useEffect } from 'react';
import fetchNews from '../api/fetchNews';

const useNews = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchAndSetNews = async () => {
            const newsData = await fetchNews();
            setNews(newsData);
        };
        fetchAndSetNews();
    }, []);

    return news;
};

export default useNews;
