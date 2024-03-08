// useHistoricalData.jsx
import { useState, useEffect, useRef } from 'react';
import fetchHistoricalData from '../api/fetchHistoricalData';

function useHistoricalData(ticker) {
    const [latestPrice, setLatestPrice] = useState(null);
    const [changePercentage, setChangePercentage] = useState(null);
    const priceSeries = useRef([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchHistoricalData(ticker);
                if (data && data.length > 0) {
                    const lastItem = data[data.length - 1];
                    const secondLastItem = data[data.length - 2];
                    const priceChange = ((lastItem[1] - secondLastItem[1]) / secondLastItem[1]) * 100;

                    setLatestPrice(lastItem[1]);
                    setChangePercentage(priceChange.toFixed(2));

                    // Update price series
                    priceSeries.current = data.map(([timestamp, price]) => ({
                        time: timestamp,
                        value: price,
                    }));
                }
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        };

        fetchData();

        return () => {
            // Clean-up logic if needed
        };
    }, [ticker]);

    return { latestPrice, changePercentage, priceSeries: priceSeries.current };
}

export default useHistoricalData;
