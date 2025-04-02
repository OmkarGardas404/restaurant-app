import CustomerReviews from '@/components/CustomerReviews';
import LocationHeroSection from '@/components/LocationHeroSection';
import { Navbar } from '@/components/Navbar';
import { PopularDishes } from '@/components/PopularDishes';
import React from 'react'
import { useParams } from 'react-router-dom'

const LocationDetails = () => {
    const { id } = useParams();
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
