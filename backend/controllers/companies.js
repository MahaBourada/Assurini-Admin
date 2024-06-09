import Company from "../model/Company.js";

export const getAllCompanies = async (req, res) => {
  const companies = await Company.find();
  if (!companies)
    return res.status(204).json({ message: "No companies found." });

  res.json(companies);
};

export const getOneCompany = async (req, res) => {
  const { id } = req.params;

  const company = await Company.findById(id).exec();
  if (!company)
    return res
      .status(400)
      .json({ message: `Company with the ID ${id} not found` });

  res.json(company);
};

export const createCompany = async (req, res) => {
  const companyBody = req.body;

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPhone = /^(\+213|0)(5|6|7)\d{8}$/;

  if (
    !companyBody.companyName ||
    !companyBody.address ||
    !companyBody.email ||
    !companyBody.phone ||
    !companyBody.description
  )
    return res.status(400).json({ message: "All fields are required" });

  if (!regexEmail.test(companyBody.email))
    return res.status(400).json({ message: "Invalid e-mail" });
  if (!regexPhone.test(companyBody.phone))
    return res.status(400).json({ message: "Invalid phone number" });

  try {
    const duplicate = await Company.findOne({
      companyName: companyBody.companyName,
    }).exec();

    if (duplicate)
      return res.status(409).json({ message: "Company name already exists" });
    const result = await Company.create(companyBody);

    res.send(`Company ${companyBody.companyName} added to the database!`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const companyBody = req.body;

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPhone = /^(\+213|0)(5|6|7)\d{8}$/;

  if (
    !companyBody.companyName ||
    !companyBody.address ||
    !companyBody.email ||
    !companyBody.phone ||
    !companyBody.description
  )
    return res.status(400).json({ message: "All fields are required" });

  if (!regexEmail.test(companyBody.email))
    return res.status(400).json({ message: "Invalid e-mail" });
  if (!regexPhone.test(companyBody.phone))
    return res.status(400).json({ message: "Invalid phone number" });

  const company = await Company.findById(id).exec();

  if (!company) return res.status(400).json({ message: "Company not found" });

  const duplicate = await Company.findOne({
    companyName: companyBody.companyName,
    _id: { $ne: id }, // Exclude current offer ID from duplicate check
  })
    .lean()
    .exec();

  if (duplicate && duplicate?._id.toString() !== companyBody._id)
    return res.status(409).json({ message: "Company name already exists" });

  if (
    company.companyName === companyBody.companyName &&
    company.address === companyBody.address &&
    company.email === companyBody.email &&
    company.phone === companyBody.phone &&
    company.description === companyBody.description
  )
    return res.status(400).json({ message: "No information was updated" });

  company.companyName = companyBody.companyName;
  company.address = companyBody.address;
  company.email = companyBody.email;
  company.phone = companyBody.phone;
  company.description = companyBody.description;

  const updatedCompany = await company.save();

  res.json({ message: `${updatedCompany.companyName} updated` });
};

export const deleteCompany = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Company ID required" });

  const company = await Company.findById(id).exec();
  if (!company) return res.status(400).json({ message: "Company not found" });

  const result = await company.deleteOne();

  const reply = `Company name ${company.companyName} with the ID ${company.id} deleted`;

  res.json(reply);
};
