import React, { useRef, useEffect, useState } from 'react';
import { useThemeProvider } from '../utils/ThemeContext';
import { createChart, ColorType } from 'lightweight-charts';
import useHistoricalData from '../utils/hooks/useHistoricalData';
import useTickerData from '../utils/hooks/useTickerData';

function formatNumberWithSuffix(num) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const tier = Math.log10(Math.abs(num)) / 3 | 0;
    if (tier === 0) return num;
    const suffix = suffixes[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = num / scale;
    return scaled.toFixed(2) + suffix;
}

function formatPEratio(peRatio) {
    return isNaN(peRatio) ? "—" : peRatio.toFixed(2);
}

function formatYield(yieldValue) {
    return isNaN(yieldValue) ? "—" : (yieldValue * 100).toFixed(2) + '%';
}

function StockCard({ ticker }) {
    const chartContainerRef = useRef();
    const [containerRendered, setContainerRendered] = useState(false);
    const { currentTheme } = useThemeProvider();
    const { latestPrice, changePercentage, priceSeries } = useHistoricalData(ticker);
    const tickerData = useTickerData(ticker);

    useEffect(() => {
        let isMounted = true; // Flag to track whether the component is mounted
        let chart = null; // Initialize chart variable

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
                if (isMounted) { // Only perform operations on the chart if the component is still mounted
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
            isMounted = false; // Set the flag to false when the component is unmounted
            if (chart) {
                chart.remove(); // Cleanup the chart instance
            }
        };
    }, [ticker, currentTheme, containerRendered, priceSeries]);

    useEffect(() => {
        if (chartContainerRef.current) {
            setContainerRendered(true);
        }
    }, []);

    return (
        <>
            <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">{ticker}</h2>
                </header>
                <div className="px-5 py-4 space-y-4">
                    <div className="flex items-start">
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">${latestPrice ? latestPrice.toFixed(2) : 'Loading...'}</div>
                        <div className={`text-sm font-semibold text-white px-1.5 rounded-full ${changePercentage > 0 ? 'bg-emerald-500' : 'bg-amber-500'}`}>{changePercentage}</div>
                    </div>
                    <div ref={chartContainerRef} className="h-64 w-full"></div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">About {ticker}</h3>
                    <div>{tickerData ? tickerData.businessSummary : 'Loading...'}</div>

                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">Market details</h3>

                    <div className="p-3 overflow-x-auto">
                        <table className="table-auto w-full dark:text-slate-300">
                            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                                <tr>
                                    <td className="p-2 font-semibold text-slate-800 dark:text-slate-100 text-left lg:col-span-1 xl:col-span-1">Open</td>
                                    <td className="p-2 text-right lg:col-span-1 xl:col-span-1">{tickerData ? formatNumberWithSuffix(tickerData.open) : 'Loading...'}</td>
                                    <td className="p-2 font-semibold text-slate-800 dark:text-slate-100 text-left lg:col-span-1 xl:col-span-1">High</td>
                                    <td className="p-2 text-right lg:col-span-1 xl:col-span-1">{tickerData ? formatNumberWithSuffix(tickerData.high) : 'Loading...'}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold text-slate-800 dark:text-slate-100 text-left lg:col-span-1 xl:col-span-1">Low</td>
                                    <td className="p-2 text-right lg:col-span-1 xl:col-span-1">{tickerData ? formatNumberWithSuffix(tickerData.low) : 'Loading...'}</td>
                                    <td className="p-2 font-semibold text-slate-800 dark:text-slate-100 text-left lg:col-span-1 xl:col-span-1">Exchange</td>
                                    <td className="p-2 text-right lg:col-span-1 xl:col-span-1">{tickerData ? tickerData.exchange : 'Loading...'}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold text-slate-800 dark:text-slate-100 text-left lg:col-span-1 xl:col-span-1">Market Cap</td>
                                    <td className="p-2 text-right lg:col-span-1 xl:col-span-1">{tickerData ? formatNumberWithSuffix(tickerData.marketCap) : 'Loading...'}</td>
                                    <td className="p-2 font-semibold text-slate-800 dark:text-slate-100 text-left lg:col-span-1 xl:col-span-1">P/E Ratio</td>
                                    <td className="p-2 text-right lg:col-span-1 xl:col-span-1">{tickerData ? formatPEratio(tickerData.peRatio) : 'Loading...'}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold text-slate-800 dark:text-slate-100 text-left lg:col-span-1 xl:col-span-1">Beta</td>
                                    <td className="p-2 text-right lg:col-span-1 xl:col-span-1">{tickerData ? formatNumberWithSuffix(tickerData.beta) : 'Loading...'}</td>
                                    <td className="p-2 font-semibold text-slate-800 dark:text-slate-100 text-left lg:col-span-1 xl:col-span-1">52-week High</td>
                                    <td className="p-2 text-right lg:col-span-1 xl:col-span-1">{tickerData ? formatNumberWithSuffix(tickerData.fiftyTwoWeekHigh) : 'Loading...'}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold text-slate-800 dark:text-slate-100 text-left lg:col-span-1 xl:col-span-1">52-week Low</td>
                                    <td className="p-2 text-right lg:col-span-1 xl:col-span-1">{tickerData ? formatNumberWithSuffix(tickerData.fiftyTwoWeekLow) : 'Loading...'}</td>
                                    <td className="p-2 font-semibold text-slate-800 dark:text-slate-100 text-left lg:col-span-1 xl:col-span-1">Volume</td>
                                    <td className="p-2 text-right lg:col-span-1 xl:col-span-1">{tickerData ? formatNumberWithSuffix(tickerData.volume) : 'Loading...'}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-semibold text-slate-800 dark:text-slate-100 text-left lg:col-span-1 xl:col-span-1">Average Volume</td>
                                    <td className="p-2 text-right lg:col-span-1 xl:col-span-1">{tickerData ? formatNumberWithSuffix(tickerData.averageVolume) : 'Loading...'}</td>
                                    <td className="p-2 font-semibold text-slate-800 dark:text-slate-100 text-left lg:col-span-1 xl:col-span-1">Yield</td>
                                    <td className="p-2 text-right lg:col-span-1 xl:col-span-1">{tickerData ? formatYield(tickerData.yield) : 'Loading...'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StockCard;
