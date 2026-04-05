import React from "react";

export const BigButton = ({ label }) => {
  return (
    <button className="w-[469px] h-[61px] mx-2 mt-11 bg-main text-white font-secondary text-[22px] rounded-2xl hover:bg-main-hover active:translate-x-[1px] active:translate-y-[1px] transition-all">
      {label}
    </button>
  );
};

export const SmallButton = ({ label, icon }) => {
  const className = `${icon ? "mr-3" : ""}`;
  return (
    <button
      className="flex items-center justify-evenly h-[61px] px-6 mx-2 mt-11 bg-main text-white font-secondary text-[22px] rounded-2xl hover:bg-main-hover active:translate-x-[1px] active:translate-y-[1px] transition-all"
    >
      <h1 className={className}>{label}</h1>
      {icon && icon}
    </button>
  );
};
