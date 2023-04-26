import { createSlice } from '@reduxjs/toolkit'
import { history } from '../../App';
import { ACCESS_TOKEN, getStoreJson, http, saveStore, saveStoreJson, USER_LOGIN } from '../../util/config';

const initialState = {
    userLogin: getStoreJson(USER_LOGIN),
    // userLogin: {
    //   "taiKhoan": "250196",
    //   "matKhau": "1234"
    // }
    thongTinNguoiDung : {}
}

const QuanLyNguoiDung = createSlice({
  name: 'QuanLyNguoiDung',
  initialState,
  reducers: {
    loginAction: (state, action) => {
        state.userLogin = action.payload;
    },
    LayThongTinDatVeActionAPI: (state, action) => {
      state.thongTinNguoiDung = action.payload;
    }
  }
});

export const {loginAction, LayThongTinDatVeActionAPI} = QuanLyNguoiDung.actions

export default QuanLyNguoiDung.reducer


export const loginApi = (userLogin) => {
    return async dispatch => {
        const result = await http.post('/api/QuanLyNguoiDung/DangNhap',userLogin);
        console.log('obDangNhap', result.data.content);
        //Cập nhật cho reducer
        const action = loginAction(result.data.content);
        dispatch(action);
        // //Lưu localstorage
        saveStoreJson(USER_LOGIN, result.data.content);
        saveStore(ACCESS_TOKEN, result.data.content.accessToken);
        // //Gọi axios lấy dữ liệu api từ token  
        // //Gọi api getprofile
       if(result.data.statusCode === 200){
        history.goBack();
       }

   
    }
}

export const LayLichSuDatVeAPI = () => {
  return async dispatch => {
      const result = await http.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
      // console.log('ketquadatve', result.data.content);
      //Cập nhật cho reducer
      const action = LayThongTinDatVeActionAPI(result.data.content);
      dispatch(action);
  }
}

