const fetchCompanyList = () => {
  return fetch(`http://localhost:5000/companies`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export default fetchCompanyList;