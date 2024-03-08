const fetchHistoricalData = (ticker, setLatestPrice, setChangePercentage, priceSeries) => {
    fetch(`http://localhost:5000/historical/${ticker}`)
        .then((res) => res.json())
        .then((data) => {
            const next = data.map((item) => {
                const time = item[0]; // Use the Unix timestamp directly
                return { value: item[1], time: time };
            });
            priceSeries.current.setData(next);

            const lastItem = data[data.length - 1];
            const secondLastItem = data[data.length - 2];
            setLatestPrice(lastItem[1]);

            // Calculate change percentage
            const change = ((lastItem[1] - secondLastItem[1]) / secondLastItem[1]) * 100;
            const formattedChange = change.toFixed(2);
            setChangePercentage({
                value: `${change > 0 ? '+' : ''}${formattedChange}%`,
                bgColor: change > 0 ? 'bg-emerald-500' : 'bg-amber-500'
            });
        });
};

export default fetchHistoricalData;
