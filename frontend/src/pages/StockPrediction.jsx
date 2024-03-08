import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import Header from '../components/Header';
import StockCard from '../components/StockCard';
import Banner from '../components/Banner';
import PredictionBanner from '../components/PredictionBanner';

function StockPrediction() {
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
                        {/* Prediction banner */}
                        <PredictionBanner />

                        {/* Search */}
                        <Search setTicker={handleSetTicker} />

                        {/* Render Stock Card only if a stock is selected */}
                        {selectedStock && <StockCard ticker={ticker} />}

                    </div>
                </main>

                <Banner />
            </div>
        </div>
    );
}

export default StockPrediction;
