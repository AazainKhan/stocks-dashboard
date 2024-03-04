import React, { useState, useEffect } from 'react';
import useCompanySearch from '../utils/hooks/useCompanySearch';

function Search({ setData, setTicker }) {
    const [searchTerm, setSearchTerm] = useState('');
    const companies = useCompanySearch(searchTerm);
    const [selectedCompany, setSelectedCompany] = useState('');

    useEffect(() => {
        if (selectedCompany) {
            setTicker(selectedCompany);
            setData(null);
        }
    }, [selectedCompany, setData, setTicker]);

    const filteredCompanies = companies.filter(company => 
        company.label.toLowerCase().startsWith(searchTerm.toLowerCase())
    ).slice(0, 10);

    return (
        <form className="max-w-md mx-auto py-10"> 
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <input 
                    type="search" 
                    id="default-search" 
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Search for a company..." 
                    required 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg dark:bg-gray-700">
                        {filteredCompanies.map((company) => (
                            <div 
                                key={company.value} 
                                onClick={() => setSelectedCompany(company.value)}
                                className="cursor-pointer p-4 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                            >
                                {company.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </form>
    );
}

export default Search;