import { createSlice } from '@reduxjs/toolkit'
import { ThongTinPhongVe } from '../../_core/models/ThongTinPhongVe';
import { http } from '../../util/config'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { displayLoading, hideLoading } from './LoadingReducer';
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
    thongTinDatVe: new ThongTinDatVe(),
    tabActive: 1,
    thongtinLichChieu:{}

}

const QuanLyDatPhimReducer = createSlice({
    name: 'QuanLyDatPhimReducer',
    initialState,
    reducers: {
        getLayThongTinDatVeAPI: (state, action) => {
            state.chitietPhongVe = action.payload;
        },
        getDatVe: (state, action) => {
            // let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            // const index = state.danhSachGheDangDat.findIndex(item => item.maGhe === action.gheDuocChon.maGhe);
            // if (index != -1) {
            //     danhSachGheCapNhat.splice(index, 1);
            // } else {
            //     danhSachGheCapNhat.push(action.gheDuocChon);
            // }
            //    return {...state,danhSachGheDangDat : danhSachGheCapNhat}

            // const danhSachGheDangDat = [...state.danhSachGheDangDat]
            const index = state.danhSachGheDangDat.findIndex(item => item.maGhe === action.payload.maGhe);
            if (index != -1) {
                state.danhSachGheDangDat.splice(index, 1);
            } else {
                state.danhSachGheDangDat.push(action.payload)
            }

        },
        getDatVeAction: (state, action) => {
            state.thongTinDatVe = action.payload;
        },

        ///
        getDatVeHoanTat: (state, action) => {
            state.danhSachGheDangDat = []
        },
        getChuyenTag: (state, action) => {
            state.tabActive = 2
        },
        getQuayLai: (state, action) => {
            state.tabActive = action.number;
        },
        getTaoLichChieu: (state, action) => {
            state.thongtinLichChieu = action.payload;
        }

    }
});

export const { getLayThongTinDatVeAPI, getDatVe, getDatVeAction, getDatVeHoanTat, getChuyenTag,getQuayLai,getTaoLichChieu } = QuanLyDatPhimReducer.actions

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


export const getButtonDatVeApi = (thongTinDatVe = new ThongTinDatVe()) => {

    return async (dispatch, getState) => {

        try {
            dispatch(displayLoading());

            const result = await http.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe)
            const action = getDatVeAction(result.data.content)
            dispatch(action);
            console.log("Kết quả trả về: ", result);


            /// Loading 
            await dispatch(getLayThongTinDatVe(thongTinDatVe.maLichChieu))
            await dispatch(getDatVeHoanTat())
            await dispatch(hideLoading());
            // Chuyển trang 
            // dispatch(getChuyenTag());



        } catch (err) {
            dispatch(hideLoading());
            console.log("Lỗi", err)
            // console.log(displayLoading);
            // const action = displayLoading();
            // dispatch(action);

       

        }

    }
}



export const taoLichChieu = (thongtinLichChieu) => {

    return async (dispatch, getState) => {

        try {
            const result = await http.post(`/api/QuanLyDatVe/TaoLichChieu`,thongtinLichChieu)
            const action = getTaoLichChieu(result.data.content)
            dispatch(action);
            alert("Thêm lịch chiếu thành công ")
        } catch (err) {
            console.log(err)
        }

    }
}