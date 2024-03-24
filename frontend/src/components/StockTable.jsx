import React, { useState } from 'react';

function StockTable({ title, data }) {
    const [showMore, setShowMore] = useState(false);
    const displayedRows = showMore ? data.length : 10; // Use this variable directly

    const handleShowMoreClick = () => {
        setShowMore(!showMore);
    };

    return (
        <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
            </header>
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full dark:text-slate-300">
                        <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                            <tr>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Symbol</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Price</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Change</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                            {data.slice(0, displayedRows).map((stock, index) => (
                                <tr key={index}>
                                    <td className="p-2 text-slate-800 dark:text-slate-100">{stock.symbol}</td>
                                    <td className="p-2 text-center text-slate-800 dark:text-slate-100">{stock.price.toFixed(2)}</td>
                                    <td className={`p-2 text-center ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {stock.change.toFixed(2)} ({(stock.changesPercentage).toFixed(2)}%)
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleShowMoreClick}
                    >
                        {showMore ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StockTable;
