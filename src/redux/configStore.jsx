import {configureStore} from '@reduxjs/toolkit';
import CarouselReducer from './reducers/CarouselReducer'
//  import demoRe from './reducers/demoRe';
import QuanLyPhimReducer from './reducers/QuanLyPhimReducer';
import QuanLyRapPhimReducer from './reducers/QuanLyRapPhimReducer';
import QuanLyNguoiDung from './reducers/QuanLyNguoiDung';
import QuanLyDatPhimReducer from './reducers/QuanLyDatPhimReducer';
export const store = configureStore({
    reducer: {
        CarouselReducer: CarouselReducer,
        QuanLyPhimReducer: QuanLyPhimReducer,
        QuanLyRapPhimReducer: QuanLyRapPhimReducer,
        QuanLyNguoiDung: QuanLyNguoiDung,
        QuanLyDatPhimReducer: QuanLyDatPhimReducer
    }
})