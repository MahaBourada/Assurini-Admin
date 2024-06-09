import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { CirclePlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import CompanyCard from "../components/CompanyCard";
import Oval from "react-loading-icons/dist/esm/components/oval";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Alert, AlertTitle } from "@mui/material";

const CompaniesPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
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
    <div className="flex">
      <SideBar selected={"Companies"} />
      <div className="w-full flex-col">
        <NavBar />
        <main className="mx-5">
          <div className="flex items-center">
            <h1 className="text-main text-5xl font-secondary font-bold mb-2">
              Insurance companies
            </h1>

            <Link
              to={"/companies/add"}
              className="hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              <CirclePlus
                color="#022B3A"
                size={45}
                style={{ marginLeft: "50px" }}
              />
            </Link>
          </div>

          {location.state && (
            <Alert
              severity="success"
              variant="filled"
              style={{ width: "95%", margin: "20px 0 10px 18px" }}
            >
              <AlertTitle style={{ fontWeight: "bold" }}>Success</AlertTitle>
              {location.state}
            </Alert>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-[550px]">
              <Oval stroke="#022B3A" width={100} height={100} />
            </div>
          ) : companies.length === 0 ? (
            <div className="flex items-center justify-center h-[550px]">
              <h1 className="font-secondary font-semibold text-main text-3xl">
                No companies registered yet
              </h1>
            </div>
          ) : (
            <div className="grid grid-cols-4 max-lg:grid-cols-1 max-xl:grid-cols-2 max-2xl:grid-cols-3 max-[1600px]:grid-cols-3">
              {companies &&
                companies.map((company, index) => (
                  <Link className="w-fit h-fit" to={company._id}>
                    <CompanyCard key={index} company={company} />
                  </Link>
                ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CompaniesPage;
