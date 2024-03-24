import React, { useRef, useEffect, useState } from 'react';
import { useThemeProvider } from '../utils/ThemeContext';
import { createChart, ColorType } from 'lightweight-charts';
import useHistoricalData from '../utils/hooks/useHistoricalData';
import useTickerNews from '../utils/hooks/useTickerNews'; // Assuming this is a custom hook to fetch news

function NewsStockCard({ ticker }) {
    const chartContainerRef = useRef();
    const [containerRendered, setContainerRendered] = useState(false);
    const news = useTickerNews(ticker); // Use the custom hook to get news data
    const { currentTheme } = useThemeProvider();
    const { latestPrice, changePercentage, priceSeries } = useHistoricalData(ticker);
    const [displayCount, setDisplayCount] = useState(10); // State to manage displayed news count

    useEffect(() => {
        let isMounted = true;
        let chart = null;

        if (chartContainerRef.current && containerRendered && priceSeries.length) {
            chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: currentTheme === 'dark' ? "#121212" : "white" },
                    textColor: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'black',
                },
                grid: {
                    vertLines: {
                        color: currentTheme === 'dark' ? '#242424' : '#f0f0f0',
                    },
                    horzLines: {
                        color: currentTheme === 'dark' ? '#242424' : '#f0f0f0',
                    },
                },
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight,
            });

            const resizeObserver = new ResizeObserver(entries => {
                if (isMounted) {
                    const { width, height } = entries[0].contentRect;
                    chart.resize(width, height);
                }
            });
            resizeObserver.observe(chartContainerRef.current);

            const priceSeriesInstance = chart.addAreaSeries({
                lineColor: 'rgba(33, 150, 243, 1)',
                topColor: 'rgba(33, 150, 243, 0.4)',
                bottomColor: 'rgba(33, 150, 243, 0)',
            });

            priceSeriesInstance.setData(priceSeries);
        }

        return () => {
            isMounted = false;
            if (chart) {
                chart.remove();
            }
        };
    }, [ticker, currentTheme, containerRendered, priceSeries]);

    useEffect(() => {
        if (chartContainerRef.current) {
            setContainerRendered(true);
        }
    }, []);

    // Function to toggle display count
    const toggleDisplayCount = () => {
        setDisplayCount(prevCount => (prevCount === 10 ? news.length : 10));
    };

    return (
        <>
            <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">{ticker}</h2>
                </header>
                <div className="px-5 py-4 space-y-4">
                    <div className="flex items-start">
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">${latestPrice ? latestPrice.toFixed(2) : 'Loading...'}</div>
                        <div className={`text-sm font-semibold text-white px-1.5 rounded-full ${changePercentage > 0 ? 'bg-emerald-500' : 'bg-amber-500'}`}>{changePercentage > 0 ? '+' : ''}{changePercentage}%</div>
                    </div>
                    <div ref={chartContainerRef} className="h-64 w-full"></div>
                    <div>
                <h3 className="py-3 px-1 font-semibold text-slate-800 dark:text-slate-100">Recent news</h3>

                        <div className="overflow-x-auto">
                            <table className="table-auto w-full dark:text-slate-300">
                                <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
                                    <tr>
                                        <th className="p-2">
                                            <div className="font-semibold text-left">Date/Time</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-left">Headline</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                                    {news.slice(0, displayCount).map((item, index) => (
                                        <tr key={index}>
                                            <td className="p-2 text-slate-800 dark:text-slate-100">{item.datetime}</td>
                                            <td className="p-2 text-slate-800 dark:text-slate-100">
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{item.headline}</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                onClick={toggleDisplayCount} // Toggle display count onClick
                            >
                                {displayCount === 10 ? 'Show more' : 'Show less'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewsStockCard;

