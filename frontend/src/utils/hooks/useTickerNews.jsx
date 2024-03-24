// /frontend/utils/hooks/useTickerNews.jsx

import { useEffect, useState } from 'react';
import { fetchTickerNews } from '../api/fetchTickerNews';

function useTickerNews(ticker) {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchTickerNews(ticker).then(setNews);
    }, [ticker]);

    return news;
}

export default useTickerNews;
