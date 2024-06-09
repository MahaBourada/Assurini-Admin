import Offer from "../model/Offer.js";

export const getAllOffers = async (req, res) => {
  const offers = await Offer.find().lean();
  if (!offers) return res.status(400).json({ message: "No offers found." });

  res.json(offers);
};

export const getOneOffer = async (req, res) => {
  const { id } = req.params;

  const offer = await Offer.findById(id);
  if (!offer)
    return res
      .status(400)
      .json({ message: `Offer with the ID ${id} not found.` });

  res.json(offer);
};

export const createOffer = async (req, res) => {
  const offerBody = req.body;

  if (
    !offerBody.offerName ||
    !offerBody.companyName ||
    !offerBody.type ||
    !offerBody.price ||
    !offerBody.terms
  )
    return res.status(400).json({ message: "All fields are required" });

  try {
    const duplicate = await Offer.findOne({
      offerName: offerBody.offerName,
    })
      .lean()
      .exec();

    if (duplicate)
      return res.status(409).json({ message: "Plan name already exists" });

    const result = await Offer.create(offerBody);

    res.send(`Offer ${offerBody.offerName} added to the database!`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOffer = async (req, res) => {
  const { id } = req.params;
  const offerBody = req.body;

  if (
    !offerBody.offerName ||
    !offerBody.companyName ||
    !offerBody.type ||
    !offerBody.price ||
    !offerBody.terms
  )
    return res.status(400).json({ message: "All fields are required" });

  const offer = await Offer.findById(id).exec();

  if (!offer) return res.status(400).json({ message: "Offer not found" });

  const duplicate = await Offer.findOne({
    offerName: offerBody.offerName,
    _id: { $ne: id }, // Exclude current offer ID from duplicate check
  })
    .lean()
    .exec();

  if (duplicate && duplicate?._id.toString() !== offerBody._id)
    return res.status(409).json({ message: "Plan name already exists" });

  if (
    offer.offerName === offerBody.offerName &&
    offer.companyName === offerBody.companyName &&
    offer.type === offerBody.type &&
    offer.price === offerBody.price &&
    offer.terms === offerBody.terms
  )
    return res.status(400).json({ message: "No information was updated" });

  offer.offerName = offerBody.offerName;
  offer.companyName = offerBody.companyName;
  offer.type = offerBody.type;
  offer.price = offerBody.price;
  offer.terms = offerBody.terms;

  const updatedOffer = await offer.save();

  res.json({ message: `${updatedOffer.offerName} updated` });
};

export const deleteOffer = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Offer ID required" });

  const offer = await Offer.findById(id).exec();
  if (!offer) return res.status(400).json({ message: "Offer not found" });

  const result = await offer.deleteOne();

  const reply = `Offer name ${offer.offerName} with the ID ${offer.id} deleted`;

  res.json(reply);
};
