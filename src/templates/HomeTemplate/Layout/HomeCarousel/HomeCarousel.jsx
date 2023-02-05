import React from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import axios from 'axios'
import { getAllProductApi } from '../../../../redux/reducers/CarouselReducer';
// import CarouselReducer from '../../../../redux/reducers/CarouselReducer';
const contentStyle = {
    marginTop: '0px',
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat'
};
export default function HomeCarousel() {
    const { arrImg } = useSelector(state => state.CarouselReducer)

    // console.log('arr', arrImg);
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };
    //
   const dispatch = useDispatch();
   useEffect(() => {
       const actionThunk = getAllProductApi();
       dispatch(actionThunk);
   }, [])

    

    const renderImg = () => {
        return arrImg.map((item, index) => {
            return (
                <div key={index}>
                    <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                        <img src={item.hinhAnh} alt={item.hinhAnh} className='w-full opacity-0' />
                    </div>
                </div>
            )
        })
    }

    return (
        <Carousel afterChange={onChange}>
            {renderImg()}
        </Carousel>
    )
}
