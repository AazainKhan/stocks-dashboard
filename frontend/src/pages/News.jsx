import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Banner from '../components/Banner';
import NewsBanner from '../components/NewsBanner';
import NewsStockCard from '../components/NewsStockCard';
import NewsSearch from '../components/NewsSearch';
import NewsTable from '../components/NewsTable';

function StockNews() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null); // State to track selected stock
    const [ticker, setTicker] = useState('AAPL'); // Initialize ticker state with 'AAPL'

    // Function to update the ticker
    const handleSetTicker = (newTicker) => {
        setSelectedStock(newTicker); // Update selected stock
        setTicker(newTicker); // Update ticker
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto flex flex-col gap-6">
                        {/* News banner */}
                        <NewsBanner />

                        {/* Search bar */}
                        <div className="relative w-full lg:w-1/2 mx-auto flex flex-col gap-2">
                        <NewsSearch setTicker={handleSetTicker} />
                        </div>
                        <NewsTable />
                        {/* Render Stock Card only if a stock is selected, date range selected, and submit button clicked */}
                        {selectedStock && <NewsStockCard ticker={ticker}/>}
                    </div>
                </main>

                <Banner />
            </div>
        </div>
    );
}

export default StockNews;