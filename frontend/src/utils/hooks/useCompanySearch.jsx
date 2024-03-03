import { useEffect, useState } from 'react';
import fetchCompanyList from '../api/fetchCompanyList';

const useCompanySearch = (searchTerm) => {
    const [companyList, setCompanyList] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            fetchCompanyList(searchTerm)
                .then((companies) => {
                    setCompanyList(companies);
                });
        } else {
            setCompanyList([]);
        }
    }, [searchTerm]);

    return companyList;
};

export default useCompanySearch;