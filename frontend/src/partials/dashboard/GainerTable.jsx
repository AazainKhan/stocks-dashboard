import React from 'react';
import useTopData from '../../utils/hooks/useTopData';

function StockTable() {
    const topGainers = useTopData();

    return (
        <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Top Gainers</h2>
            </header>
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs text-slate-500 bg-slate-50">
                            <tr>
                                <th className="p-2"><div className="font-semibold text-left">Symbol</div></th>
                                <th className="p-2"><div className="font-semibold text-center">Price</div></th>
                                <th className="p-2"><div className="font-semibold text-center">Change</div></th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium divide-y divide-slate-100">
                            {topGainers.map(gainer => (
                                <tr key={gainer.symbol}>
                                    <td className="p-2">{gainer.symbol}</td>
                                    <td className="p-2 text-center">{gainer.price}</td>
                                    <td className="p-2 text-center">{gainer.change} ({(gainer.changesPercentage).toFixed(2)}%)</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StockTable;