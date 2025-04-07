import CustomerReviews from '@/components/CustomerReviews';
import LocationHeroSection from '@/components/LocationHeroSection';
import { Navbar } from '@/components/Navbar';
import { PopularDishes } from '@/components/PopularDishes';

const LocationDetails = () => {
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
