import { useEffect, useState } from 'react';
import fetchTopLosers from '../api/fetchTopLosers';

const useTopLosers = () => {
    const [topLosers, setTopLosers] = useState([]);

    useEffect(() => {
        const getTopLosers = async () => {
            const data = await fetchTopLosers();
            if (data && Array.isArray(data)) {
                setTopLosers(data);
            } else {
                console.error('Data is not in expected format:', data);
            }
        };

        getTopLosers();
    }, []);

    return topLosers;
};

export default useTopLosers;
