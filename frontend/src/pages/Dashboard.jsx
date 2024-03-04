import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Search from '../components/Search';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import useTopGainers from '../utils/hooks/useTopGainers';
import useTopLosers from '../utils/hooks/useTopLosers';

import StockTable from '../partials/dashboard/StockTable';

import Banner from '../partials/Banner';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const topGainers = useTopGainers();
  const topLosers = useTopLosers();
  // const topActive = useTopActive();

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Search */}
            <Search />

            {/* Cards */}
            <div className="mb-8">
              <StockTable title="Top Gainers" data={topGainers} />
            </div>
            <div className="mb-8">
              <StockTable title="Top Losers" data={topLosers} />
            </div>
            {/* Uncomment the following lines once you have the useTopActive hook */}
            {/* <div className="mb-4">
              <StockTable title="Top Active" data={topActive} />
            </div> */}

          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Dashboard;