import { useEffect, useState } from "react";
import ReservationCard from "@/components/ReservationCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Navbar } from "@/components/Navbar";
import { Reservation } from "@/types/FormData";
 
export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
 
  const handleEdit = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDialogOpen(true);
  };
 
  const handleCancel = (id: string) => {
    console.log(id)
    // setReservations(reservations.map(r => (r.id === id ? { ...r, status: "Cancelled" } : r)));
  };

  useEffect(() => {
    const FetchResevations = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_RESERVATIONS, {
                method:"GET",
                headers: {
                    "Content-Type":"application/json"
                }
            });
            const responseData = await response.json();
            setReservations(responseData);
            console.log(responseData)
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
 
 