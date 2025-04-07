import React, { useState } from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import ReservationModal from "./ReservationModal";

interface Table {
  id: number;
  locationAddress: string;
  seating: number;
  availableSlots: string[];
  image: string;
  tableNumber: string;
  locationId: string;
  capacity:number
}

interface TableListProps {
  tables: Table[];
  date: string;
}

const TableList: React.FC<TableListProps> = ({ tables, date }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [guests, setGuests] = useState(1);
  const openModal = (table: Table, slot: string) => {
    setSelectedTable(table);
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };
  console.log(tables);
  return (
    <div className="mt-6">
      {tables.length > 0 && (
        <h3 className="text-xl font-semibold mb-4 p-2">
          {tables.length} tables available
        </h3>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tables.map((table) => (
          <div
            key={table.id}
            className="bg-white p-4 shadow-md rounded-lg flex"
          >
            <img
              src={table.image}
              alt="Restaurant"
              className="w-40 h-32 rounded-lg object-cover"
            />
            <div className="ml-4">
              <div className="flex items-center justify-between ">
                <h4 className="font-semibold text-lg flex items-center">
                  <FaMapMarkerAlt className="text-green-600 mr-2" />{" "}
                  {table.locationAddress}
                </h4>
                <p>{table.tableNumber}</p>
              </div>
              <p className="text-gray-600">
                Table seating capacity: {table.capacity} people
              </p>
              <p className="text-gray-700 font-medium">Available slots:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {table.availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    className="flex items-center px-3 py-1 border border-green-600 text-green-600 rounded-lg hover:bg-green-100"
                    onClick={() => openModal(table, slot)}
                  >
                    <FaClock className="mr-1" /> {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedTable && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          location={selectedTable.locationAddress}
          date={date}
          guests={guests}
          setGuests={setGuests}
          timeSlot={selectedSlot}
          tableNumber={selectedTable.tableNumber}
          locationId={selectedTable.locationId}
        />
      )}
    </div>
  );
};

export default TableList;
