import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import OfferPage from "./pages/OfferPage.jsx";
import CompaniesPage from "./pages/CompaniesPage.jsx";
import AddOffer from "./pages/AddOffer.jsx";
import AddCompany from "./pages/AddCompany.jsx";
import Missing from "./pages/Missing.jsx";
import { AuthProvider } from "./context/AuthProvider.js";
import useAxiosPrivate from "./hooks/useAxiosPrivate.js";
import { useEffect, useState } from "react";
import OfferDetails from "./pages/OfferDetails.jsx";
import CompanyDetails from "./pages/CompanyDetails.jsx";
import EditOffer from "./pages/EditOffer.jsx";
import EditCompany from "./pages/EditCompany.jsx";

function App() {
  const axiosPrivate = useAxiosPrivate();
  const [offers, setOffers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const offersRes = await axiosPrivate.get("/offers");
        setOffers(offersRes.data);

        const companiesRes = await axiosPrivate.get("/companies");
        setCompanies(companiesRes.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [axiosPrivate]);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/stats"
          element={
            <StatsPage
              offers={offers}
              companies={companies}
              loading={loading}
            />
          }
        />
        <Route path="/plans">
          <Route index element={<OfferPage />} />
          <Route path=":id" element={<OfferDetails />} />
          <Route
            path=":id/edit"
            element={<EditOffer companies={companies} />}
          />
          <Route path="add" element={<AddOffer companies={companies} />} />
        </Route>
        <Route path="/companies">
          <Route index element={<CompaniesPage />} />
          <Route path=":id" element={<CompanyDetails />} />
          <Route path=":id/edit" element={<EditCompany />} />
          <Route path="add" element={<AddCompany />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
