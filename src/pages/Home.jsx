import React from 'react'
import Hero from '../components/Hero'
import Collections from '../components/Collections'
import BestSellers from '../components/BestSellers'
import Accordion from '../components/Acciordian'


const Home = () => {
  return (
   <>
     <Hero />
     <Collections />
     <BestSellers />
     <Accordion />
   </>
  )
}

export default Home
