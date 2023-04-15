import React from 'react'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'
import HomeMenu from './HomeMenu'
import HomeProductCarousel from './HomeProductCarousel'

export default function Home() {
  return (
    <div>
      <HomeCarousel />
      <div className="search">
        <div className="container">
          <div className="search-content">
            <div className="content">
              <div className="row">
                <div className="col-10 select">
                  <select id="countries" class="text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>

                  <select id="countries" class="text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>

                  <select id="countries" class="text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
                <div className="col-2 button">
                  <div className="buy">
                    <button>Mua Vé Ngay</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="body-font">
        <div class="container px-5 py-5 mx-auto bg-white">
          <HomeProductCarousel />
        </div>
      </section>
      <HomeMenu />
    </div>
  )
}
