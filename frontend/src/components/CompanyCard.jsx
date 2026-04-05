import React from "react";
/* import Logo from "../assets/Images/Blue Final Logo PNG.png"; */

const CompanyCard = ({ company }) => {
  const createdAtDate = new Date(company.createdAt);

  // Format the date to a more readable format
  const formattedCreatedAt = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="h-80 w-80 bg-secondary py-7 px-8 m-4 mr-7 mb-10 text-main font-secondary rounded-[35px] max-lg:mx-auto hover:translate-x-[1px] hover:translate-y-[1px]">
      <h1 className="card-text text-3xl font-bold">
        {company.companyName.length <= 13
          ? company.companyName
          : `${company.companyName.slice(0, 13)}...`}
      </h1>
      <h2 className="m-2 text-[22px] font-semibold">
        Address:
        <span className="font-normal"> {company.address.length <= 25
          ? company.address
          : `${company.address.slice(0, 25)}...`}</span>
      </h2>
      <h2 className="m-2 text-[22px] font-semibold">
        E-mail:{" "}
        <span className="font-normal">
          {company.email.length <= 10
            ? company.email
            : `${company.email.slice(0, 10)}...`}
        </span>
      </h2>
      <h2 className="m-2 text-[22px] font-semibold">
        Phone: <span className="font-normal"> {company.phone}</span>
      </h2>
      <h2 className="m-2 text-[22px] font-semibold">
        Created on:{" "}<span className="font-normal">{formattedCreatedAt}</span>
      </h2>
    </div>
  );
};

export default CompanyCard;
