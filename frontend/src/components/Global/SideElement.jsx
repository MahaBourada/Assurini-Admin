import { ChevronRight } from "lucide-react";
import React from "react";

const SideElement = ({ icon, label, selected }) => {
  return (
    <div
      className={`${
        selected === label
          ? "bg-secondary"
          : "bg-transparent hover:bg-secondary"
      } 
      flex justify-between items-center  py-2 px-5 my-4 rounded-3xl`}
    >
      <div className="flex items-center">
        {icon}
        <h1 className="m-4">{label}</h1>
      </div>
      {selected === label && <ChevronRight color="#022b3a" size={35} />}
    </div>
  );
};

export default SideElement;
