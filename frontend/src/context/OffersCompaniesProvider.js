// OffersCompaniesContext.js
import { createContext, useState } from "react";

const OffersCompaniesContext = createContext();

export const OffersCompaniesProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <OffersCompaniesContext.Provider
      value={{ offers, setOffers, companies, setCompanies, loading, setLoading }}
    >
      {children}
    </OffersCompaniesContext.Provider>
  );
};

export default OffersCompaniesContext;
