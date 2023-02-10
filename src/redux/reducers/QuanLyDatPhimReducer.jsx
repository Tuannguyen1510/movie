import { createSlice } from '@reduxjs/toolkit'
import { ThongTinPhongVe } from '../../_core/models/ThongTinPhongVe';
import {http} from '../../util/config'
const initialState = {
    chitietDatVe:  new ThongTinPhongVe()
}

const QuanLyDatPhimReducer = createSlice({
  name: 'QuanLyDatPhimReducer',
  initialState,
  reducers: {
    getLayThongTinDatVeAPI :(state, action) => {
        state.chitietDatVe = action.payload;
    }
  }
});

export const {getLayThongTinDatVeAPI} = QuanLyDatPhimReducer.actions

export default QuanLyDatPhimReducer.reducer


export const getLayThongTinDatVe = (maPhim) => {

    return async (dispatch, getState) => {

        try {
            const result = await http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=45825`)


            const action = getLayThongTinDatVeAPI(result.data.content)
            dispatch(action);
            // console.log(result);

        } catch (err) {
            console.log(err)
        }

    }
}
