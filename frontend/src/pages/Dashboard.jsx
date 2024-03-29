import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import Header from '../components/Header';
import WelcomeBanner from '../components/WelcomeBanner';
import useTopGainers from '../utils/hooks/useTopGainers';
import useTopLosers from '../utils/hooks/useTopLosers';
import StockCard from '../components/StockCard';
import StockTable from '../components/StockTable';
import Banner from '../components/Banner';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null); // State to track selected stock
  const [ticker, setTicker] = useState('AAPL'); // Initialize ticker state with 'AAPL'

  const topGainers = useTopGainers();
  const topLosers = useTopLosers();

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
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Search */}
            <div className="relative w-full lg:w-1/2 mx-auto">
            <Search setTicker={handleSetTicker} />
            </div>
            {/* Render Stock Card only if a stock is selected */}
            {selectedStock && <StockCard ticker={ticker}/>}

            {/* Tables */}
            <StockTable title="Top Gainers" data={topGainers} />
            <StockTable title="Top Losers" data={topLosers} />
            {/* <StockTable title="Top Active" data={topActive} /> */}
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
