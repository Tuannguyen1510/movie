
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {http} from '../../util/config'
const initialState = {
    arrImg: [{
        "maBanner": 1,
        "maPhim": 1282,
        "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png"
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
            const result = await http.get('/api/QuanLyPhim/LayDanhSachBanner')
            // console.log(result);
            const action = getAllProductApiAction(result.data.content);
            dispatch(action);
        }catch (err) {
            console.log(err)
        }

    }
}