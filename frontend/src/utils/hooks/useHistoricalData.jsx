import { useEffect, useState } from 'react';
import fetchHistoricalData from '../api/fetchHistoricalData';

const useHistoricalData = (ticker) => {
    const [historicalData, setHistoricalData] = useState([]);
    const [latestPrice, setLatestPrice] = useState(0);
    const [changePercentage, setChangePercentage] = useState(0);

    useEffect(() => {
        fetchHistoricalData(ticker).then(data => {
            setHistoricalData(data.historicalData);
            setLatestPrice(data.latestPrice);
            setChangePercentage(data.changePercentage);
        });
    }, [ticker]);

    return { historicalData, latestPrice, changePercentage };
};

export default useHistoricalData;