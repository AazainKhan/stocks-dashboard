const fetchTickerData = async (ticker) => {
    try {
        const response = await fetch(`http://localhost:5000/${ticker}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return {
            beta: data.beta,
            businessSummary: data.longBusinessSummary,
            open: data.open,
            high: data.dayHigh,
            low: data.dayLow,
            exchange: data.exchange,
            marketCap: data.marketCap,
            peRatio: data.trailingPE,
            fiftyTwoWeekHigh: data.fiftyTwoWeekHigh,
            fiftyTwoWeekLow: data.fiftyTwoWeekLow,
            volume: data.volume,
            averageVolume: data.averageVolume,
            yield: data.dividendYield,
        };
    } catch (error) {
        console.error('Error fetching ticker data:', error);
        return null;
    }
};

export default fetchTickerData;
