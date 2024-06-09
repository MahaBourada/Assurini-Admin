import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Oval from "react-loading-icons/dist/esm/components/oval";
import { Alert, AlertTitle, Tooltip } from "@mui/material";

const CompanyDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const companyRes = await axiosPrivate.get(`/companies/${id}`);
        setCompany(companyRes.data);

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
      await axiosPrivate.delete(`/companies/${id}`);
      navigate("/companies", { state: "Company deleted succesfully" });
    } catch (err) {
      setErrorText(err.response.data.message);
    }
  };

  const createdAtDate = new Date(company.createdAt);

  // Format the date to a more readable format
  const formattedCreatedAt = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex">
      <SideBar selected={"Companies"} />
      <div className="w-full flex-col">
        <NavBar />
        <main className="mx-5">
          <div className="flex items-center justify-between max-w-[98%]">
            <h1 className="text-main text-5xl font-secondary font-bold mb-2">
              {company.companyName}
            </h1>

            <div className="flex items-center justify-between mr-5">
              <Tooltip title="Edit" placement="top" arrow>
                <Link
                  to={`/companies/${company._id}/edit`}
                  state={{ company }}
                  className="hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  <Pencil
                    color="#022B3A"
                    size={36}
                    style={{
                      margin: "0 6px"
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
                      margin: "0 6px"
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
                  <h1>Address</h1>
                  <h2 className="m-1 mx-4 text-2xl font-normal">
                    {company.address}
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-2 mb-6">
                <div>
                  <h1>E-mail</h1>
                  <h2 className="m-1 mx-4 text-2xl font-normal">
                    {company.email}
                  </h2>
                </div>
                <div>
                  <h1>Phone number</h1>
                  <h2 className="m-1 mx-4 text-2xl font-normal">
                    {company.phone}
                  </h2>
                </div>
              </div>
              <h1 className="mt-6">Description</h1>
              <h2 className="m-1 mx-4 text-2xl font-normal">
                {company.description}
              </h2>
            </div>
          )}

          {errorText && errorText && (
            <Alert
              severity="error"
              variant="filled"
              style={{ width: "80%", marginLeft: "18px" }}
            >
              <AlertTitle style={{ fontWeight: "bold" }}>Error</AlertTitle>
              {errorText}
            </Alert>
          )}
        </main>
      </div>
    </div>
  );
};

export default CompanyDetails;
