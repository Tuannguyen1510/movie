import React from 'react'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'
import HomeMenu from './HomeMenu'
import HomeProductCarousel from './HomeProductCarousel'

export default function Home() {
  return (
    <div>
        <HomeCarousel />
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">

          <HomeProductCarousel/>
        </div>
      </section>
      <HomeMenu />
    </div>
  )
}
