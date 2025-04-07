import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaClock, FaMinus, FaPlus, FaTimes, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
  date: string;
  guests: number;
  setGuests: React.Dispatch<React.SetStateAction<number>>;
  timeSlot: string;
  tableNumber: string;
  locationId: string;
}
const ReservationModal = ({
  isOpen,
  onClose,
  location,
  date,
  guests,
  setGuests,
  timeSlot,
  tableNumber,
  locationId,
}: ReservationModalProps) => {
  console.log(tableNumber);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  const handleReservation = async () => {
    const [timeFrom, timeTo] = timeSlot.split(" - ").map((t) => t.trim());
    console.log(
      date,
      guests,
      timeSlot,
      timeFrom,
      timeTo,
      locationId,
      tableNumber
    );
    const userData = {
      locationId,
      tableNumber,
      date,
      guestsNumber: guests,
      timeFrom,
      timeTo,
    };
    try {
      const response = await fetch(import.meta.env.VITE_BOOKING_CLIENTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        toast.error("Failed to make a reservation.");
        onClose();
        throw new Error("Failed to make a reservation");
      }
      console.log(response);
      toast.success("Reservation made successfully!");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  if (!isOpen) return null;
  return createPortal(
    <>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/30 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <FaTimes size={20} />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-semibold mb-2">Make a Reservation</h2>
          <p className="text-gray-600 mb-4">
            You are making a reservation at <strong>{location}</strong> for{" "}
            <strong>{date}</strong>.
          </p>

          {/* Guests Section */}
          <div className="mb-4">
            <p className="font-medium text-gray-700">Guests</p>
            <p className="text-gray-500 text-sm">
              Please specify the number of guests.
            </p>
            <div className="flex items-center border border-gray-300 p-2 rounded-lg mt-2">
              <FaUsers className="text-green-600 mr-2" />
              <button
                className="px-3 text-green-600"
                onClick={() => setGuests(Math.max(1, guests - 1))}
              >
                <FaMinus />
              </button>
              <span className="mx-2">{guests}</span>
              <button
                className="px-3 text-green-600"
                onClick={() => setGuests(guests + 1)}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="mb-4">
            <p className="font-medium text-gray-700">Time</p>
            <div className="flex items-center border border-gray-300 p-2 rounded-lg mt-2">
              <FaClock className="text-green-600 mr-2" />
              <span>{timeSlot}</span>
            </div>
          </div>

          {/* Reservation Button */}
          <button
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
            onClick={handleReservation}
          >
            Make a Reservation
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};
export default ReservationModal;
