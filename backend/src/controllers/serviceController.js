import Service from "../models/Service.js";
////CREATE SERVICES
export const createService = async (req, res) => {
  const { name, description, price, duration } = req.body;

  const service = await Service.create({
    name,
    description,
    price,
    duration
  });

  res.status(201).json(service);
};

///////////////// GET SERVICES
export const getServices = async (req, res) => {
  const services = await Service.find({ isActive: true });
  res.json(services);
};

////////////// UPDATE SERVICES
export const updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  res.json(service);
};

///DELETE SERVICES 
export const deleteService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  service.isActive = false;
  await service.save();

  res.json({ message: "Service disabled" });
};
