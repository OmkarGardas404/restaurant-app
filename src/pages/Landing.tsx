import { HeroSection } from '@/components/HeroSection'
import { Locations } from '@/components/Locations'
import { Navbar } from '@/components/Navbar'
import { PopularDishes } from '@/components/PopularDishes'

const Landing = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <PopularDishes />
      <Locations />
    </div>
  )
}

export default Landing
