import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
///
import { useSelector, useDispatch } from 'react-redux'

// import required modules
import { Grid, Pagination } from "swiper";
import Card from '../Card/Card';
import { useEffect } from 'react';
import { getAllPhimApi, getAllPhimDangChieu, getAllPhimSapChieu } from '../../redux/reducers/QuanLyPhimReducer';


export default function HomeProductCarousel() {






    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const actionThunk = getAllPhimApi();
        dispatch(actionThunk);
    }, [])

    const renderFilm = () => {
        return arrFilm.map((item, index) => {
            return (
                <SwiperSlide key={index}>
                    <Card item={item} />
                </SwiperSlide>
            )
        })
    }
    return (
        <div>

            <button className='btn btn-success' onClick={() => {
                const action = getAllPhimDangChieu(arrFilm)
                dispatch(action);
                console.log(action);
                alert('dang chieu')
            }}>Phim Đang chiếu</button>


            <button className='btn btn-success' onClick={() => {
                  const action = getAllPhimSapChieu(arrFilm)
                  dispatch(action);
                  console.log(action);
                  alert('sap chieu')
            }}>Phim sắp chiếu</button>


            <Swiper
                slidesPerView={4}
                grid={{
                    rows: 2,
                }}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Grid, Pagination]}
                className="mySwiper"
                style={{ width: '100%', height: '800px' }}
            >
                {renderFilm()}
            </Swiper>
        </div>
    )
}


