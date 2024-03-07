import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

function StockCard({ ticker = 'AMZN' }) {
    const chartContainerRef = useRef();
    const priceSeries = useRef();
    const [latestPrice, setLatestPrice] = useState(null);
    const [changePercentage, setChangePercentage] = useState(null);

    const fetchHistoricalData = (ticker) => {
        fetch(`http://localhost:5000/historical/${ticker}`)
            .then((res) => res.json())
            .then((data) => {
                const next = data.map((item) => {
                    const time = item[0]; // Use the Unix timestamp directly
                    return { value: item[1], time: time };
                });
                priceSeries.current.setData(next);

                // Assuming the latest price and change percentage are in the last item
                const lastItem = data[data.length - 1];
                setLatestPrice(lastItem[1]); // Replace with the actual key for latest price
                setChangePercentage(lastItem[2]); // Replace with the actual key for change percentage
            });
    };

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "white" },
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
        });
        const resizeObserver = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            chart.resize(width, height);
        });
        resizeObserver.observe(chartContainerRef.current);

        priceSeries.current = chart.addAreaSeries({
            lineColor: 'rgba(33, 150, 243, 1)',
            topColor: 'rgba(33, 150, 243, 0.4)',
            bottomColor: 'rgba(33, 150, 243, 0)',
        });

        fetchHistoricalData(ticker);

        return () => {
            chart.remove();
            resizeObserver.disconnect();
        };
    }, [ticker]);

return (
    <>
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">{ticker}</h2>
            </header>
            <div className="px-5 py-3">
                <div className="flex items-start">
                    <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">${latestPrice ? latestPrice.toFixed(2) : 'Loading...'}</div>
                    <div className="text-sm font-semibold text-white px-1.5 bg-yellow-500 rounded-full">{changePercentage}</div>
                </div>
                <div ref={chartContainerRef} className="h-64 w-full"></div>
            </div>
        </div>
    </>
)
}

export default StockCard;