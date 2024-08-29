import { useEffect, useState } from "react";

function useCurrencyInfo() {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.7.22/v1/currencies/inr.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log("Fetched data:", result.inr);  
                setData(result.inr);  
            } catch (error) {
                console.error("Error fetching currency data:", error);
            }
        };

        fetchData();
    }, []);

    return data;
}

export default useCurrencyInfo;
