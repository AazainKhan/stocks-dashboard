import React, { useEffect, useState } from 'react';

const NewsTable = () => {
    const [news, setNews] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [displayedRows, setDisplayedRows] = useState(10);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('http://localhost:5000/news');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNews(JSON.parse(data)); // Adjust based on the actual format of the response
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchNews();
    }, []);

    const handleShowMoreClick = () => {
        setShowMore(!showMore);
        setDisplayedRows(showMore ? 10 : news.length); 
    };

    return (
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">News</h2>
            </header>
            <div className="px-5 py-4">
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
                            {news.slice(0, displayedRows).map((item, index) => (
                                <tr key={index}>
                                    <td className="p-2 text-slate-800 dark:text-slate-100">{item.Time}</td>
                                    <td className="p-2 text-slate-800 dark:text-slate-100">
                                        <a href={item.URL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            {item.Headline}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-4"> 
                    <button 
                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                        onClick={handleShowMoreClick}
                    >
                        {showMore ? 'Show less' : 'Show more'}
                    </button>
                </div>
            </div> 
        </div>
    );
};

export default NewsTable;
