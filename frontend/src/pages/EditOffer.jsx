import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import {
  Alert,
  AlertTitle,
  Box,
  MenuItem,
  TextField,
  styled,
} from "@mui/material";
import { SmallButton } from "../components/Global/Buttons";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Pencil } from "lucide-react";
import { useLocation } from "react-router-dom";

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

const types = [
  {
    value: "Car",
    label: "Car",
  },
  {
    value: "Holiday",
    label: "Holiday",
  },
  {
    value: "House",
    label: "House",
  },
  {
    value: "Life",
    label: "Life",
  },
];

const EditOffer = ({ companies }) => {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const offer = location.state.offer;
  const [offerName, setOfferName] = useState(offer.offerName);
  const [companyName, setCompanyName] = useState(offer.companyName);
  const [description, setDescription] = useState(offer.description);
  const [type, setType] = useState(offer.type);
  const [price, setPrice] = useState(offer.price);
  const [terms, setTerms] = useState(offer.terms);
  const [errorText, setErrorText] = useState("");
  const [warningText, setWarningText] = useState("");
  const [successText, setSuccessText] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedOffer = {
      offerName,
      companyName,
      type,
      description,
      price,
      terms,
    };

    try {
      await axiosPrivate.patch(`/offers/${offer._id}`, updatedOffer);

      setSuccessText(true);
      setErrorText("");
    } catch (err) {
      if (err.response.data.message === "No information was updated") {
        setWarningText(err.response.data.message);
        setErrorText("");
        setSuccessText(false);
      } else {
        setErrorText(err.response.data.message);
        setWarningText("");
        setSuccessText(false);
      }
    }
  };

  return (
    <div className="flex">
      <SideBar selected={"Plans"} />
      <div className="w-full flex-col">
        <NavBar />
        <main className="mx-5">
          <h1 className="text-main text-5xl font-secondary font-bold">
            Edit plan details
          </h1>

          <form onSubmit={handleSubmit}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "40%" },
                margin: "20px 10px 3px 10px",
              }}
              noValidate
              autoComplete="off"
            >
              <CssTextField
                label="Plan name"
                id="custom-css-outlined-input"
                value={offerName}
                defaultValue="meow"
                onChange={(e) => setOfferName(e.target.value)}
                required
                InputLabelProps={{
                  style: {
                    fontFamily: "Cairo, sans-serif",
                    fontSize: "17.5px",
                  },
                }}
              />

              <CssTextField
                id="outlined-select-currency"
                select
                label="Company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                InputLabelProps={{
                  style: {
                    fontFamily: "Cairo, sans-serif",
                    fontSize: "18px",
                  },
                }}
              >
                {companies.map((company) => (
                  <MenuItem key={company._id} value={company.companyName}>
                    {company.companyName}
                  </MenuItem>
                ))}
              </CssTextField>

              <CssTextField
                id="outlined-select-currency"
                select
                label="Plan types"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                InputLabelProps={{
                  style: {
                    fontFamily: "Cairo, sans-serif",
                    fontSize: "18px",
                  },
                }}
              >
                {types.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CssTextField>

              <CssTextField
                label="Price (DA)"
                id="custom-css-outlined-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                margin: "3px 10px 20px 10px",
              }}
              noValidate
              autoComplete="off"
            >
              <CssTextField
                label="Description"
                id="outlined-multiline-flexible"
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
              <CssTextField
                id="outlined-multiline-flexible"
                label="Terms & Conditions"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
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

            {errorText && (
              <Alert
                severity="error"
                variant="filled"
                style={{ width: "80%", marginLeft: "18px" }}
              >
                <AlertTitle style={{ fontWeight: "bold" }}>Error</AlertTitle>
                {errorText}
              </Alert>
            )}

            {warningText && (
              <Alert
                severity="warning"
                variant="filled"
                style={{ width: "80%", marginLeft: "18px" }}
              >
                <AlertTitle style={{ fontWeight: "bold" }}>Warning</AlertTitle>
                {warningText}
              </Alert>
            )}

            {successText && (
              <Alert
                severity="success"
                variant="filled"
                style={{ width: "80%", marginLeft: "18px" }}
              >
                <AlertTitle style={{ fontWeight: "bold" }}>Success</AlertTitle>
                Plan updated successfully!
              </Alert>
            )}

            <div className="w-[82%] flex justify-end mb-20">
              <SmallButton label="Edit" icon={<Pencil color="#ffffff" />} />
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditOffer;
