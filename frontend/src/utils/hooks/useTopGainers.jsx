import { useEffect, useState } from 'react';
import fetchTopGainers from '../api/fetchTopGainers';

const useTopGainers = () => {
    const [topGainers, setTopGainers] = useState([]);

    useEffect(() => {
        const getTopGainers = async () => {
            const data = await fetchTopGainers();
            if (data && Array.isArray(data)) {
                setTopGainers(data);
            } else {
                console.error('Data is not in expected format:', data);
            }
        };

        getTopGainers();
    }, []);

    return topGainers;
};

export default useTopGainers;
