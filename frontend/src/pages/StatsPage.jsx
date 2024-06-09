import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import LinePlot from "../components/CountLinePlot";
import { Oval } from "react-loading-icons";
//import { useLocation } from "react-router-dom";

const StatsPage = ({ offers, companies, loading }) => {
  //const location = useLocation()

  //console.log(location.state.email)

  return (
    <div className="flex">
      <SideBar selected={"Statistics"} />
      <div className="w-full flex-col">
        <NavBar />
        <main className="mx-5">
          <h1 className="text-main text-5xl font-secondary font-bold">
            Statistics
          </h1>
          {loading ? (
            <div className="flex items-center justify-center h-[550px]">
              <Oval stroke="#022B3A" width={100} height={100} />
            </div>
          ) : (
            <div className="m-5 my-10 flex max-2xl:flex-col">
              <div className="mr-5">
                <h1 className="text-main text-4xl font-secondary font-semibold mb-7">
                  Insurance plans
                </h1>
                <LinePlot data={offers} ylabel="Number of plans" />
              </div>

              <div className="ml-5">
                <h1 className="text-main text-4xl font-secondary font-semibold mb-7">
                  Insurance companies
                </h1>
                <LinePlot data={companies} ylabel="Number of comapnies" />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StatsPage;
