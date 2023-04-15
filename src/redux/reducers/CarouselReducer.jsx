
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {http} from '../../util/config'
const initialState = {
    arrImg: [{
        maPhim: 11771,
        "tenPhim": "Chính diện của tra công 2",
        "biDanh": "chinh-dien-cua-tra-cong-2",
        "trailer": "https://www.youtube.com/watch?v=IhJUtMe-SkY",
        "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/high-low-the-worst-x-high-low-the-worst-x_gp01.jpg",
        "moTa": "Đẳng cấp đam mỹ 2024",
        "maNhom": "GP02",
        "ngayKhoiChieu": "2023-03-13T15:37:21.923",
        "danhGia": 10,
        "hot": true,
        "dangChieu": true,
        "sapChieu": false
      }
    ]
    
}

const CarouselReducer = createSlice({
  name: 'CarouselReducer',
  initialState,
  reducers: {
    getAllProductApiAction: (state, action) => {
        state.arrImg = action.payload
    }
  }
});

export const {getAllProductApiAction} = CarouselReducer.actions

export default CarouselReducer.reducer





// action thunk 
//------------------ action thunk ------------
export const getAllProductApi = () => {

    return async (dispatch,getState) => {

        try{
            // const result = await axios ({
            //     url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner',
            //     method:'GET'
            // });
            const result = await http.get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP08')
            // console.log(result);
            const action = getAllProductApiAction(result.data.content);
            dispatch(action);
        }catch (err) {
            console.log(err)
        }

    }
}