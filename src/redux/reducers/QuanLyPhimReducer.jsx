import { createSlice } from '@reduxjs/toolkit'
import { GROUPID, http } from '../../util/config'
const initialState = {
    arrFilm:
        [{
            "maPhim": 11323,
            "tenPhim": "Trải nghiệm cùng Adam",
            "biDanh": "trai-nghiem-cung-adam",
            "trailer": "https://youtu.be/Fva_W_AF0IM",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/black-adam_gp01.jpg",
            "moTa": "Dwayne Johnson sẽ góp mặt trong tác phẩm hành động - phiêu lưu mới của New Line Cinema “Black Adam”. Đây là bộ phim đầu tiên trên màn ảnh rộng khai thác câu chuyện của siêu anh hùng DC này, dưới sự sáng tạo của đạo diễn Jaume Collet-Serra (“Jungle Cruise”). ",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2023-02-01T18:03:00.373",
            "danhGia": 8,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
        },
        ],
    dangChieu: true,
    sapChieu: true,
    arrFilmDefault: [],
    // form: [{
    //     tenPhim: '',
    //     moTa: '',
    //     trailer: '',
    //     hot: true,
    //     hinhAnh: {},
    //     danhGia: 5,
    //     dangChieu: true,
    //     ngayKhoiChieu: "",
    //     sapChieu: true
    // }],
    thongTinPhim : {} 
}

const QuanLyPhimReducer = createSlice({
    name: 'QuanLyPhimReducer',
    initialState,
    reducers: {
        getAllPhimApiAction: (state, action) => {
            state.arrFilm = action.payload

            // DS CHIEU
            // state.arrFilm = action.payload.filter(film => film.dangChieu ===
            //     state.dangChieu);
            // DS SAP CHIEU
            // state.arrFilm = action.payload.filter(film => film.sapChieu ===
            //     state.sapChieu);
        },
        getAllPhimDangChieu: (state, action) => {
            state.arrFilm = action.payload.filter(film => film.dangChieu ===
                state.dangChieu);
            // console.log(action.arrFilm.dangChieu);   
        },
        getAllPhimSapChieu: (state, action) => {
            state.arrFilm = action.payload.filter(film => film.sapChieu ===
                state.sapChieu);
            console.log(action);
        },
        themPhimUpLoadApiAction: (state, action) => {
            state.formData = action.payload;
        },
        editPhimUpLoadApiAction: (state, action) => {
            state.thongTinPhim = action.payload;
        },
    }
});

export const { getAllPhimApiAction, getAllPhimDangChieu, getAllPhimSapChieu,themPhimUpLoadApiAction , editPhimUpLoadApiAction} = QuanLyPhimReducer.actions

export default QuanLyPhimReducer.reducer



// action thunk 
//------------------ action thunk ------------
export const getAllPhimApi = () => {

    return async (dispatch, getState) => {

        try {
            const result = await http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP11`)

            const action = getAllPhimApiAction(result.data.content);
            dispatch(action);
            //    if(action.type == 'SET_DANH_SACH_PHIM'){
            //        const action = getAllPhimApiAction(result.data.content);
            //        dispatch(action)
            //    }

            console.log(result);
        } catch (err) {
            console.log(err)
        }

    }
}



export const themPhimUpLoadApi = (formData) => {

    return async (dispatch, getState) => {

        try {
            const result = await http.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData)

            const action = themPhimUpLoadApiAction(result.data.content);
            dispatch(action);
           alert("Them Phim Thanh Cong");

            console.log(result);
        } catch (err) {
            console.log(err)
        }

    }
}


export const EditPhimUpLoadApi = (maPhim) => {

    return async (dispatch, getState) => {

        try {
            const result = await http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)

            const action = editPhimUpLoadApiAction(result.data.content);
            dispatch(action);
            console.log(result);
        } catch (err) {
            console.log(err)
        }

    }
}