import React, { useRef, useState } from 'react'; import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import ReactDOM from 'react-dom'
import ModalVideo from 'react-modal-video'
import axios from 'axios'
import { getAllProductApi } from '../../../../redux/reducers/CarouselReducer';
// import CarouselReducer from '../../../../redux/reducers/CarouselReducer';


// carousel 
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { YoutubeOutlined ,PlayCircleOutlined} from '@ant-design/icons';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

export default function HomeCarousel() {
    const [isOpen, setOpen] = useState(false)
    const { arrImg } = useSelector(state => state.CarouselReducer);

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



    /// carousel 
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    const renderImg = () => {
        return arrImg.map((item, index) => {
            const url = item.trailer;
            // console.log(url);
            const id = url.split("/").pop();
            console.log(id);
            return (
                <div key={index}>
                    <SwiperSlide className="carousel" style={{
                             backgroundImage: `url(${item.hinhAnh})`, // Sử dụng template literals để truyền dữ liệu vào backgroundImage
                             backgroundSize: 'cover',
                             backgroundRepeat:'no-repeat',
                             backgroundPosition: 'center',
                             /* Các thuộc tính background khác */
                            
                        }}>
                            <div className="video">
                                <React.Fragment>
                                    <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={id} onClose={() => setOpen(false)} />
                                    <button className="btn-primary" onClick={() => setOpen(true)}><PlayCircleOutlined style={{ width: "100px", height: "100px" }} /></button>
                                </React.Fragment>
                        </div>
                    </SwiperSlide>
                </div>
            )
        })
    }

    return (
        <div id="CarouselHome">
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
            >
                {renderImg()}
            </Swiper>
        </div>

    )
}
