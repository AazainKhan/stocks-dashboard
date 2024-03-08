import { useState, useEffect } from 'react';
import fetchTickerData from '../api/fetchTickerData';

const useTickerData = (ticker) => {
    const [tickerData, setTickerData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTickerData(ticker);
            setTickerData(data);
        };

        fetchData();

        return () => {
            // Cleanup logic if needed
        };
    }, [ticker]);

    return tickerData;
};

export default useTickerData;
