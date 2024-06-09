import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { Alert, AlertTitle, Box, TextField, styled } from "@mui/material";
import { SmallButton } from "../components/Global/Buttons";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { CirclePlus } from "lucide-react";

const CssTextField = styled(TextField)({
  "& label: ": {
    fontFamily: "Cairo, sans-serif",
  },
  "& label.Mui-focused": {
    color: "#022B3A",
  },
  "& .MuiOutlinedInput-root": {
    /* '& fieldset': {
        borderColor: '#022B3A',
      }, */
    color: "#333333",
    fontFamily: "Cairo, sans-serif",
    borderRadius: "16px",
    "&:hover fieldset": {
      borderColor: "#022B3A",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#022B3A",
    },
  },
});

const AddCompany = () => {
  const axiosPrivate = useAxiosPrivate();
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCompany = {
      companyName,
      address,
      email,
      phone,
      description,
    };

    try {
      await axiosPrivate.post("/companies", newCompany);

      setSuccessText(true);
      setErrorText("");

      setCompanyName("");
      setAddress("");
      setEmail("");
      setPhone("");
      setDescription("");
    } catch (err) {
      setErrorText(err.response.data.message);
      setSuccessText(false);
    }
  };

  return (
    <div className="flex">
      <SideBar selected={"Companies"} />
      <div className="w-full flex-col">
        <NavBar />
        <main className="mx-5">
          <h1 className="text-main text-5xl font-secondary font-bold">
            Add insurance company
          </h1>

          <form onSubmit={handleSubmit}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "40%" },
                margin: "20px 10px",
              }}
              noValidate
              autoComplete="off"
            >
              <CssTextField
                label="Company name"
                id="custom-css-outlined-input"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                InputLabelProps={{
                  style: {
                    fontFamily: "Cairo, sans-serif",
                    fontSize: "17.5px",
                  },
                }}
              />

              <CssTextField
                label="Address"
                id="custom-css-outlined-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                InputLabelProps={{
                  style: {
                    fontFamily: "Cairo, sans-serif",
                    fontSize: "18px",
                  },
                }}
              />

              <CssTextField
                id="outlined-multiline-flexible"
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputLabelProps={{
                  style: {
                    fontFamily: "Cairo, sans-serif",
                    fontSize: "18px",
                  },
                }}
              />

              <CssTextField
                label="Phone"
                id="custom-css-outlined-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                type="number"
                InputLabelProps={{
                  style: {
                    fontFamily: "Cairo, sans-serif",
                    fontSize: "18px",
                  },
                }}
              />
            </Box>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "81%" },
                margin: "20px 10px",
              }}
              noValidate
              autoComplete="off"
            >
              <CssTextField
                label="Description"
                id="custom-css-outlined-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                multiline
                minRows={6}
                InputLabelProps={{
                  style: {
                    fontFamily: "Cairo, sans-serif",
                    fontSize: "18px",
                  },
                }}
              />
            </Box>

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

            {successText && (
              <Alert
                severity="success"
                variant="filled"
                style={{ width: "80%", marginLeft: "18px" }}
              >
                <AlertTitle style={{ fontWeight: "bold" }}>Success</AlertTitle>
                Company added successfully!
              </Alert>
            )}

            <div className="w-[82%] flex justify-end mb-20">
              <SmallButton label="Add" icon={<CirclePlus color="#ffffff" />} />
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddCompany;
