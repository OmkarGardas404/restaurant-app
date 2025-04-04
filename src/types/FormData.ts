export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  export interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }
   
  export type ReservationStatus = "RESERVED" | "In Progress" | "FINISHED" | "Cancelled";
   
  export interface Reservation {
    id: string;
    location: string;
    date: string;
    timeFrom: string;
    timeTo:string;
    guestsNumber: number;
    status: ReservationStatus;
  }
   
   