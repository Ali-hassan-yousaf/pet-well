import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import Topbarber from '../components/Topbarber'
import Banner from '../components/Banner'
import BarberCount from '../components/barbercount'
import Usercomments from '../components/Usercomments'
// import Mobile from '../components/mobile'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <Topbarber />
      <Banner />
      <BarberCount/>
      <Usercomments/>
      {/* <Mobile/> */}

    </div>
  )
}

export default Home