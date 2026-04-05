import React from "react";
import { SmallButton } from "../components/Global/Buttons";
import { Link } from "react-router-dom";
import Error404 from "../assets/images/404 Error.png";

const Missing = () => {
  return (
    <main className="m-28 flex justify-evenly items-center">
      <div className="w-1/2">
        <h1 className="m-2 font-main text-6xl text-main">
          Oops! 
        </h1>
        <h1 className="mx-6 my-6 mb-0 font-secondary text-3xl text-main">
          You seem to have lost your way...
        </h1>

        <Link to={-1} className="flex justify-start ml-20 w-fit">
          <SmallButton label="Go back" />
        </Link>
      </div>

      <div>
        <img
          className="p-3 m-2"
          src={Error404}
          alt="Assurini Logo"
          width={650}
          height={650}
        />
      </div>
    </main>
  );
};

export default Missing;
