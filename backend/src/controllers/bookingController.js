import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const { serviceId, date, time } = req.body;

  // check slot availability
  const existingBooking = await Booking.findOne({
    service: serviceId,
    date,
    time,
    status: { $ne: "cancelled" }
  });

  if (existingBooking) {
    return res.status(400).json({
      message: "This time slot is already booked"
    });
  }

  const booking = await Booking.create({
    user: req.user._id,
    service: serviceId,
    date,
    time
  });

  res.status(201).json(booking);
};


export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("service", "name price duration");

  res.json(bookings);
};

export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("user", "name email")
    .populate("service", "name price");

  res.json(bookings);
};


export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;

  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = status;
  await booking.save();

  res.json(booking);
};

