import { useEffect, useState } from "react";
import ReservationCard from "@/components/ReservationCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Navbar } from "@/components/Navbar";
import { Reservation } from "@/types/FormData";
import { toast } from "react-toastify";
 
export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
 
  const handleEdit = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDialogOpen(true);
  };
 
  const handleCancel = async (id: string) => {
    try {
      const URL = `${import.meta.env.VITE_DELETE_RESERVATION}/${id}`;
  
      // Delete reservation
      const deleteResponse = await fetch(URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("username")}`
        }
      });
      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the reservation");
      }
  
      toast.success("Reservation deleted successfully!");
  
      // Refetch reservations
      const getResponse = await fetch(import.meta.env.VITE_RESERVATIONS, {
        method: "GET",
        headers: {
          Authorization: `${sessionStorage.getItem("username")}`
        }
      });
  
      if (!getResponse.ok) {
        throw new Error("Failed to fetch reservations");
      }
  
      const responseData = await getResponse.json();
      const data = responseData.map((reservation: Reservation) => ({
        ...reservation,
        locationAddress: reservation.locationAddress
      }));
      setReservations(data);
    } catch (error) {
      console.error("Failed to delete reservation:", error);
      // toast.error("Failed to delete reservation.");
    }
  };
 
  useEffect(() => {
    const FetchResevations = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_RESERVATIONS, {
                method:"GET",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            const responseData = await response.json();
            setReservations(responseData);
        }catch(error) {
            console.error(error)
        }
    }
    FetchResevations();
  },[]);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4"> </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reservations.map(reservation => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onEdit={() => handleEdit(reservation)}
              onCancel={() => handleCancel(reservation.id)}
              onFeedback={() => {}}
              locationId={reservation.locationId}
            />
          ))}
        </div>
      </div>
 
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Reservation</DialogTitle>
          </DialogHeader>
          <p>Form to edit reservation (not implemented)</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
 
 