import { createSlice } from '@reduxjs/toolkit'
import { ThongTinPhongVe } from '../../_core/models/ThongTinPhongVe';
import { http } from '../../util/config'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
const initialState = {
    // chitietPhongVe: [{
    //     danhSachGhe: [],
    //     thongTinPhim: {}
    // }]
    chitietPhongVe: new ThongTinPhongVe(),
    danhSachGheDangDat: [{
        maGhe: 0,
        tenGhe: 0,
        maRap: 0,
        loaiGhe: "",
        stt: '',
        giaVe: 0,
        daDat: false,
        taiKhoanNguoiDat: null
    }],
    thongTinDatVe : new ThongTinDatVe()

}

const QuanLyDatPhimReducer = createSlice({
    name: 'QuanLyDatPhimReducer',
    initialState,
    reducers: {
        getLayThongTinDatVeAPI: (state, action) => {
            state.chitietPhongVe = action.payload;
        },
        getDatVe: (state, action) => {
            const index = state.danhSachGheDangDat.findIndex(item => item.maGhe === action.payload.maGhe);
            if(index != -1 ){
                state.danhSachGheDangDat.splice(index , 1);
            }else{
                state.danhSachGheDangDat.push(action.payload)
            }
        },
        getDatVeAction: (state, action) => {
            state.thongTinDatVe = action.payload;
        }

    }
});

export const { getLayThongTinDatVeAPI, getDatVe,getDatVeAction } = QuanLyDatPhimReducer.actions

export default QuanLyDatPhimReducer.reducer


export const getLayThongTinDatVe = (maLichChieu) => {

    return async (dispatch, getState) => {

        try {
            const result = await http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)


            const action = getLayThongTinDatVeAPI(result.data.content)
            dispatch(action);
            // console.log("Kết quả trả về: ", result);

        } catch (err) {
            console.log(err)
        }

    }
}


export const getButtonDatVeApi = (thongTinDatVe) => {

    return async (dispatch, getState) => {

        try {
            const result = await http.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe)

            const action = getDatVeAction(result.data.content)
            dispatch(action);
            console.log("Kết quả trả về: ", result);

        } catch (err) {
            console.log(err)
        }

    }
}