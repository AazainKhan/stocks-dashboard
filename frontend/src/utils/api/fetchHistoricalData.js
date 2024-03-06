const fetchHistoricalData = (ticker) => {
  fetch(`http://localhost:5000/historical/${ticker}`)
      .then((res) => res.json())
      .then((data) => {
          const next = data.map((item) => {
              const time = item[0]; // Use the Unix timestamp directly
              return { value: item[1], time: time };
          });
          priceSeries.current.setData(next);
      });
};