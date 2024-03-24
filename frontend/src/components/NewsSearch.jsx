import React, { useState, useEffect, useRef } from 'react';
import useCompanySearch from '../utils/hooks/useCompanySearch';

function NewsSearch({ setTicker }) {
    const [searchTerm, setSearchTerm] = useState('');
    const companies = useCompanySearch(searchTerm);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef();

    // keyboard navigation.
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Count only the companies that should be displayed based on the filter.
            const maxIndex = companies.filter(company => 
                company.label.toLowerCase().startsWith(searchTerm.toLowerCase())
            ).length - 1;

            if (e.key === 'ArrowDown') {
                setSelectedIndex(prevIndex => (prevIndex < maxIndex ? prevIndex + 1 : prevIndex));
            } else if (e.key === 'ArrowUp') {
                setSelectedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                e.preventDefault();
                const filteredCompanies = companies.filter(company => 
                    company.label.toLowerCase().startsWith(searchTerm.toLowerCase())
                );
                if(filteredCompanies[selectedIndex]){
                    const selectedCompany = filteredCompanies[selectedIndex];
                    setTicker(selectedCompany.value);
                    setSearchTerm('');
                }
            }
        };

        searchRef.current && searchRef.current.addEventListener('keydown', handleKeyDown);
        return () => searchRef.current && searchRef.current.removeEventListener('keydown', handleKeyDown);
    }, [searchTerm, companies, selectedIndex, setTicker]);

    useEffect(() => {
        // Reset selected index when search term changes.
        setSelectedIndex(-1);
    }, [searchTerm]);

    useEffect(() => {
        // Detect clicks outside the search component to close the dropdown.
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [searchTerm]);

    return (
        //set width to be half of the parent container and center it
        <div ref={searchRef}>
            <input 
                type="search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for a company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <ul className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg dark:bg-gray-700">
                    {companies.filter(company => 
                        company.label.toLowerCase().startsWith(searchTerm.toLowerCase())
                    ).slice(0, 10).map((company, index) => (
                        <li 
                            key={company.value} 
                            onClick={() => { setTicker(company.value); setSearchTerm(''); }}
                            className={`cursor-pointer p-4 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600 ${index === selectedIndex ? 'bg-gray-200' : ''}`}
                        >
                            {company.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default NewsSearch;
