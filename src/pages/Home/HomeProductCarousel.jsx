import React, { useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
///

import { Button, Space } from 'antd';


import Slider from "react-slick";



import { useSelector, useDispatch } from 'react-redux'

// import required modules
import { Grid, Pagination } from "swiper";
import Cards from '../Card/Cards';
import { useEffect } from 'react';
import { getAllPhimApi, getAllPhimDangChieu, getAllPhimSapChieu } from '../../redux/reducers/QuanLyPhimReducer';


export default function HomeProductCarousel() {

    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const actionThunk = getAllPhimApi();
        dispatch(actionThunk);
    }, [])



    const [displayLimit, setDisplayLimit] = useState(8);

    const handleShowMore = () => {
        setDisplayLimit(displayLimit + 2);
    };
    const limitedItems = arrFilm.slice(0, displayLimit);

    const renderFilm = () => {
        return limitedItems.map((item, index) => {
            return (
                <div key={index} class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 product-content mt-4">
                    <Cards item={item} />
                </div>

                //    <div>
                //         <div>
                //             {limitedItems.map((item, index) => (
                //                 <li key={index}>{item}</li>
                //             ))}
                //         </div>
                //         {displayLimit < items.length && (
                //             <button onClick={handleShowMore}>Show More</button>
                //         )}
                //     </div>
                // <SwiperSlide key={index}>

                // {/* </SwiperSlide> */ }
            )
        })
    }




    return (
        <div>
            {/* <section className="product section">
                <div className="container">
          
                    <div className="content">
                        <div className="about-button">
                            <ul className="tab-style--1 nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <button className="active" id="dangchieu" data-bs-toggle="tab" data-bs-target="#rn-history" role="tab" aria-controls="history" aria-selected="true"
                                        onClick={() => {
                                            const action = getAllPhimDangChieu(arrFilm)
                                            dispatch(action);
                                            console.log(action);
                                            alert('dang chieu')
                                        }}>
                                        Phim Đang chiếu</button>
                                </li>
                                <li className="nav-item">
                                    <button id="sapchieu" data-bs-toggle="tab" data-bs-target="#rn-mission" role="tab" aria-controls="mission" aria-selected="false"
                                        onClick={() => {
                                            const action = getAllPhimSapChieu(arrFilm)
                                            dispatch(action);
                                            console.log(action);
                                            alert('sap chieu')
                                        }}>
                                        Phim sắp chiếu</button>
                                </li>
                                <li className="nav-item">
                                    <button id="phimhot" data-bs-toggle="tab" data-bs-target="#rn-history" role="tab" aria-controls="phimhot" aria-selected="false"
                                    >
                                        Phim Hot</button>
                                </li>
                                <li className="nav-item">
                                    <button id="yeuthich" data-bs-toggle="tab" data-bs-target="#rn-history" role="tab" aria-controls="yeuthich" aria-selected="false"
                                    >
                                        Top phim yêu thích </button>
                                </li>
                                <li className="nav-item">
                                    <button id="moira" data-bs-toggle="tab" data-bs-target="#rn-history" role="tab" aria-controls="moira" aria-selected="false"
                                    >
                                        Phim mới ra</button>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <Swiper
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
            > */}
            <div  id="Product">
                <div className="product row">
                    {renderFilm()}
                    <div id="Product-showmore" style={{
                        textAlign: 'center'
                    }}>
                        <Button type="primary" danger onClick={handleShowMore} class="button" style={{
                            marginTop: '50px',
                            width: '20%',
                            height: '40px',
                        }}>
                            Xem thêm
                        </Button>
                    </div>
                </div>
            </div>
            {/* </Swiper> */}

        </div>
    )
}
