import React from "react";
import Logo from "../assets/images/Wormark Logo Blue.png";
import {
  BarChartBig,
  BriefcaseBusiness,
  Building2,
  LogOut,
} from "lucide-react";
import SideElement from "./Global/SideElement";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const SideBar = ({ selected }) => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault();
  
    try {
      await axiosPrivate.get("/users/logout", {
        withCredentials: true,
      });

      navigate('/')

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="sticky bottom-0 min-w-[413px] h-screen flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center my-3 mx-6">
          <div className="flex items-center">
            {/* <img
              className="p-1 m-2"
              src={Logo}
              alt="Assurini Logo"
              width={68}
              height={68}
            />
            <h1 className="font-main font-bold text-main text-4xl text-center m-1 mt-4">
              Assurini
            </h1> */}
            <img
              className="p-1 m-3 mx-5"
              src={Logo}
              alt="Assurini Logo"
              width={200}
              height={200}
            />
          </div>
          {/* <Menu size={58} color="#022b3a" style={{ marginTop: "13px" }} /> */}
        </div>

        <div className="mx-10 text-2xl text-main font-secondary">
          <Link to={"/stats"}>
            <SideElement
              icon={<BarChartBig color="#022b3a" size={35} />}
              label="Statistics"
              selected={selected}
            />
          </Link>

          <Link to={"/plans"}>
            <SideElement
              icon={<BriefcaseBusiness color="#022b3a" size={35} />}
              label="Plans"
              selected={selected}
            />
          </Link>

          <Link to={"/companies"}>
            <SideElement
              icon={<Building2 color="#022b3a" size={35} />}
              label="Companies"
              selected={selected}
            />
          </Link>
        </div>
      </div>

      <div className="flex items-end py-2 px-5 mx-10 my-5 hover:bg-[#EFD6D6] rounded-3xl">
        <button onClick={handleLogout}>
          <div className="flex items-center text-2xl text-[#960E0E] font-secondary">
            <LogOut color="#960E0E" size={35} />
            <h1 className="m-4">Logout</h1>
          </div>
        </button>
      </div>
    </section>
  );
};

export default SideBar;
