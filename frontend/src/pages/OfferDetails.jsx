import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Oval from "react-loading-icons/dist/esm/components/oval";
import { Tooltip } from "@mui/material";

const OfferDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  const [offer, setOffer] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const offerRes = await axiosPrivate.get(`/offers/${id}`);
        setOffer(offerRes.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [axiosPrivate, id]);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await axiosPrivate.delete(`/offers/${id}`);
      navigate("/plans", { state: "Plan deleted succesfully" });
    } catch (err) {
      /* setErrorText(err.response.data.message); */
      console.log(err);
    }
  };

  const createdAtDate = new Date(offer.createdAt);

  // Format the date to a more readable format
  const formattedCreatedAt = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex">
      <SideBar selected={"Plans"} />
      <div className="w-full flex-col">
        <NavBar />
        <main className="mx-5">
          <div className="flex items-center justify-between max-w-[98%]">
            <h1 className="text-main text-5xl font-secondary font-bold mb-2">
              {offer.offerName}
            </h1>

            <div className="flex items-center justify-between mr-5">
              <Tooltip title="Edit" placement="top" arrow>
                <Link
                  to={`/plans/${offer._id}/edit`}
                  state={{ offer }}
                  className="hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  <Pencil
                    color="#022B3A"
                    size={36}
                    style={{
                      margin: "0 6px",
                    }}
                  />
                </Link>
              </Tooltip>

              <Tooltip title="Delete" placement="top" arrow>
                <button
                  onClick={handleDelete}
                  className="hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  <Trash2
                    color="#960E0E"
                    size={38}
                    style={{
                      margin: "0 6px",
                    }}
                  />
                </button>
              </Tooltip>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-[550px]">
              <Oval stroke="#022B3A" width={100} height={100} />
            </div>
          ) : (
            <div className="bg-secondary py-8 px-10 m-4 mr-7 mb-10 rounded-[35px] font-secondary text-main font-bold text-3xl">
              <div className="grid grid-cols-2 mb-6">
                <div>
                  <h1>Created at</h1>
                  <h2 className="m-1 mx-4 text-2xl font-normal">
                    {formattedCreatedAt}
                  </h2>
                </div>
                <div>
                  <h1>Company</h1>
                  <h2 className="m-1 mx-4 text-2xl font-normal">
                    {offer.companyName}
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-2 mb-6">
                <div>
                  <h1>Insurance type</h1>
                  <h2 className="m-1 mx-4 text-2xl font-normal">
                    {offer.type}
                  </h2>
                </div>
                <div>
                  <h1>Price</h1>
                  <h2 className="m-1 mx-4 text-2xl font-normal">
                    {offer.price} DA
                  </h2>
                </div>
              </div>
              <h1 className="mt-6">Description</h1>
              <h2 className="m-1 mx-4 text-2xl font-normal">
                {offer.description}
              </h2>
              <h1 className="mt-6">Terms</h1>
              <h2 className="m-1 mx-4 text-2xl font-normal">{offer.terms}</h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OfferDetails;
