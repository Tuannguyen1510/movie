import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLayThongTinDatVe } from '../../redux/reducers/QuanLyDatPhimReducer';

export default function Checkout() {
   const {chitietDatVe} = useSelector(state => state.QuanLyDatPhimReducer);
   const dispatch = useDispatch();
   useEffect(() => {
     const actionThunk = getLayThongTinDatVe();
     dispatch(actionThunk);
   }, [])

   console.log('vé' , chitietDatVe);

   const {thongtinPhim,danhSachGhe} = chitietDatVe;
   console.log('vé 1: ', thongtinPhim.tenRap);

  return (
    <div>
        <div className="row">
          <div className="col-6 p-5">
            <p className='text-center'>Màn hình</p>
          </div>
          <div className="col-6">
            <div className="content p-5">
            <h1 class="text-green text-center"> 0 đ</h1>
            <h3>{thongtinPhim.tenCumRap}</h3>
            {/* <p>Địa điểm: {thongtinPhim?.tenPhim}</p>
            <p>Ngày chiếu: {thongtinPhim?.tenPhim}</p> */}
            <hr />
            <table className="table">
              <tr>
                <td>Ghế</td>
                {/* <td>{thongtinPhim?.tenPhim}</td> */}
              </tr>
            </table>
            <hr />
            <p>Email</p>
            {/* <p>{thongtinPhim?.tenPhim} </p> */}
            <hr />
            <p>Phone</p>
            {/* <p>{thongtinPhim?.tenPhim}</p> */}
            <br />
            <button className="btn btn-success">Đặt vé</button>
            </div>
          </div>
        </div>
    </div>
  )
}

