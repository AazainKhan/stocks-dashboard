import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { useThemeProvider } from '../utils/ThemeContext'; // Import your theme context hook
import fetchHistoricalData from '../utils/api/fetchHistoricalData';

function StockCard({ ticker = 'AMZN' }) {
    const chartContainerRef = useRef();
    const priceSeries = useRef();
    const [latestPrice, setLatestPrice] = useState(null);
    const { currentTheme } = useThemeProvider(); // Use the theme context
    const [changePercentage, setChangePercentage] = useState({ value: '', bgColor: '' });

    useEffect(() => {
        const fetchAndUpdateData = () => {
            fetchHistoricalData(
                ticker,
                setLatestPrice,
                setChangePercentage,
                priceSeries
            );
        };

        const chart = createChart(chartContainerRef.current, {
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
            const { width, height } = entries[0].contentRect;
            chart.resize(width, height);
        });
        resizeObserver.observe(chartContainerRef.current);

        priceSeries.current = chart.addAreaSeries({
            lineColor: 'rgba(33, 150, 243, 1)',
            topColor: 'rgba(33, 150, 243, 0.4)',
            bottomColor: 'rgba(33, 150, 243, 0)',
        });

        fetchAndUpdateData();

        return () => {
            chart.remove();
        };
    }, [ticker, currentTheme]);

    return (
        <>
            <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">{ticker}</h2>
                </header>
                <div className="px-5 py-4 space-y-4">
                    <div className="flex items-start">
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">${latestPrice ? latestPrice.toFixed(2) : 'Loading...'}</div>
                        <div className={`text-sm font-semibold text-white px-1.5 rounded-full ${changePercentage.bgColor}`}>{changePercentage.value}</div>
                    </div>
                    <div ref={chartContainerRef} className="h-64 w-full"></div>
                </div>
            </div>
        </>
    );
}

export default StockCard;
