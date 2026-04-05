import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { CirclePlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import OfferCard from "../components/OfferCard";
import Oval from "react-loading-icons/dist/esm/components/oval";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Alert, AlertTitle } from "@mui/material";

const OfferPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const offersRes = await axiosPrivate.get("/offers");
        setOffers(offersRes.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [axiosPrivate]);

  return (
    <div className="flex">
      <SideBar selected={"Plans"} />
      <div className="flex flex-col flex-grow">
        <NavBar />
        <main className="mx-5">
          <div className="flex items-center">
            <h1 className="text-main text-5xl font-secondary font-bold mb-2">
              Insurance plans
            </h1>

            <Link
              to={"/plans/add"}
              className="hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              <CirclePlus
                color="#022B3A"
                size={45}
                style={{
                  marginLeft: "50px",
                }}
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
          ) : offers.length === 0 ? (
            <div className="flex items-center justify-center h-[550px]">
              <h1 className="font-secondary font-semibold text-main text-3xl">
                No plans registered yet
              </h1>
            </div>
          ) : (
            <div className="grid grid-cols-2">
              {offers.map((offer, index) => (
                <Link to={offer._id}>
                  <OfferCard key={index} offer={offer} />
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OfferPage;
