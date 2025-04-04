import CustomerReviews from '@/components/CustomerReviews';
import LocationHeroSection from '@/components/LocationHeroSection';
import { Navbar } from '@/components/Navbar';
import { PopularDishes } from '@/components/PopularDishes';
import  { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

const LocationDetails = () => {
    // const { id } = useParams();
    const [, setLocations] = useState("")
    useEffect(() => {
        const FetchLocations = async () => {
          try {
            const response = await fetch(import.meta.env.VITE_LOCATIONS, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const responseData = await response.json();
            setLocations(responseData["tm16-locations-dev1"]);
          } catch (error) {
            console.error(error);
          } 
        };
        FetchLocations();
      }, []);
  return (
    <div>
      <Navbar />
      <LocationHeroSection />
      <PopularDishes />
      <CustomerReviews />
    </div>
  )
}

export default LocationDetails
