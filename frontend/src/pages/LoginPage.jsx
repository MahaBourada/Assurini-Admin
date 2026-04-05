import React from "react";
/* import { styled } from "@mui/material/styles";
import { Checkbox } from "@mui/material"; */
import LoginForm from "../components/LoginForm";
import Logo from "../assets/images/Beige Final Logo PNG.png";
import { AuthProvider } from "../context/AuthProvider";

/* const CustomCheckbox = styled(Checkbox)({
  // Custom styles here
  "&.Mui-checked": {
    color: "#022B3A", // Change the color here when checked
  },
  "&.MuiCheckbox-root": {
    color: "#022B3A", // Change the color here
  },
}); */

const LoginPage = () => {
  return (
    <main
      className="bg-cover bg-center flex justify-around"
      style={{
        backgroundImage: `url(${require("../assets/images/back.png")})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="flex-col items-center">
          <h1 className="mx-2 my-14 font-main text-main text-6xl flex justify-center">
            Welcome back
          </h1>

          <AuthProvider>
            <LoginForm />
          </AuthProvider>
        </div>
      </div>
      <div className="my-auto">
        <img
          className="p-3 m-2"
          src={Logo}
          alt="Assurini Logo"
          width={250}
          height={250}
        />
        <h1 className="font-main text-secondary text-7xl text-center m-2">
          Assurini
        </h1>
      </div>
    </main>
  );
};

export default LoginPage;
