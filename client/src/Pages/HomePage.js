import React from 'react'
import Layout from '../components/layout/Layout'
import Hero from '../components/hero/Hero';
import Services from '../components/services/Services';
import Cars from '../components/cars/Cars';
import OpeningHours from '../components/openingHours/OpeningHours';
import Testimonials from '../components/testimonials/Testimonials';
import Contact from '../components/contact/Contact';

function HomePage() {
  return (
    <div>
        <Layout>
          <Hero/>
          <Services/>
          <Cars/>
          <OpeningHours/>
          <Testimonials/>
          <Contact/>
        </Layout>
    </div>
  )
}

export default HomePage
