import React from "react";

const OfferCard = ({ offer }) => {
  const createdAtDate = new Date(offer.createdAt);

  // Format the date to a more readable format
  const formattedCreatedAt = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="h-48 max-2xl:h-auto bg-secondary py-7 px-8 m-4 mr-7 mb-10 text-main font-secondary rounded-[35px] hover:translate-x-[1px] hover:translate-y-[1px]">
      <h1 className="card-text text-3xl font-bold">{offer.offerName.length <= 38
                ? offer.offerName
                : `${offer.offerName.slice(0, 38)}...`}</h1>
      <div className="mx-4 my-2 flex flex-col lg:flex-col xl:flex-row justify-between text-[22px]">
        <div className="flex flex-col">
          <h2 className="my-1 font-semibold">
            Company:{" "}
            <span className="font-normal">
              {offer.companyName.length <= 18
                ? offer.companyName
                : `${offer.companyName.slice(0, 18)}...`}
            </span>
          </h2>
          <h2 className="font-semibold">
            Type: <span className="font-normal">{offer.type}</span>
          </h2>
        </div>

        <div className="flex flex-col">
          <h2 className="my-2 font-semibold">
            Created on:{" "}
            <span className="font-normal">{formattedCreatedAt}</span>
          </h2>
          <h2 className="font-semibold">
            Price: <span className="font-normal">{offer.price} DA</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
