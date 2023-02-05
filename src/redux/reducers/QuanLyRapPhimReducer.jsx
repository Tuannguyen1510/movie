import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/config';

const initialState = {
    heThongRapChieu: [{
        // lstCumRap: { 
         
        //  },
        // "maHeThongRap" : 'CineStar',
        // "tenHeThongRap" : 'CineStar',
        // "logo": 'https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png',
        // "mahom": 'GP01' 
        }]
    
    
}

const QuanLyRapPhimReducer = createSlice({
    name: 'QuanLyRapPhimReducer',
    initialState,
    reducers: {
        getAllCumQuanLyRapActionApi: (state, action) => {
            state.heThongRapChieu = action.payload
        }
    }
});

export const { getAllCumQuanLyRapActionApi } = QuanLyRapPhimReducer.actions

export default QuanLyRapPhimReducer.reducer


// action thunk 
//------------------ action thunk ------------
export const getAllCumQuanLyRapApi = () => {

    return async (dispatch, getState) => {

        try {
            const result = await http.get('/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01')


            const action = getAllCumQuanLyRapActionApi(result.data.content)
            dispatch(action);
            console.log(result);

        } catch (err) {
            console.log(err)
        }

    }
}
