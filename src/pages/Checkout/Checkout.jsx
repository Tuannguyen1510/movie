import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLayThongTinDatVe, getDatVe, getButtonDatVeApi } from '../../redux/reducers/QuanLyDatPhimReducer';
import style from './Checkout.module.css'
import './Checkout.css'
// import {getDatVe} from '../../redux/reducers/QuanLyDatPhimReducer'
import { CloseCircleOutlined, UserOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom';
import { lodash } from 'lodash'
import _ from 'lodash';
import KetQuaThongTinDatVe  from './KetQuaThongTinDatVe';
import { Tabs } from 'antd';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import {i18n} from '../../util/i18n'
export default function Checkout() {
  const { userLogin } = useSelector(state => state.QuanLyNguoiDung);
  const { chitietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatPhimReducer);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    const actionThunk = getLayThongTinDatVe(params.maLichChieu);
    dispatch(actionThunk);
  }, [params.maLichChieu])
  // console.log("Chi tiêt: ", chitietPhongVe);
  const { danhSachGhe, thongTinPhim } = chitietPhongVe;
  //  console.log("thong tin: ", thongTinPhim);
  // console.log(thongTinPhim.ngayChieu);




  const renderList = () => {
    return danhSachGhe.map((item, index) => {
      let classGheVip = item.loaiGhe === 'Vip' ? 'gheVip' : '';
      let classGheDaDat = item.daDat === true ? 'gheDaDat' : '';
      let classGheDangDat = '';

      let classGheDaDuocDat = '';
      if (userLogin.taiKhoan === item.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat'
      }

      let indexGhe = danhSachGheDangDat.findIndex(ghe => ghe.maGhe === item.maGhe);
      if (indexGhe != -1) {
        classGheVip = 'gheDangDat'
        classGheDaDat = 'gheDangDat'
      }

      return (
        <>
          {/* { item.loaiGhe === 'Vip' ? <button className={`${style['ghe']} ${style['gheVip']}`} key={index}>{item.stt}</button>
            : <button className={`${style['ghe']}`} key={index}>   {item.daDat ? <CloseCircleOutlined /> : item.stt}</button>} */}


          <button onClick={() => {
            // console.log(item);
            const itemCart = { ...item };
            const action = getDatVe(itemCart);
            dispatch(action);
            console.log(danhSachGheDangDat);
          }}
            disabled={item.daDat} className={`ghe text-center ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} `} key={index}>
            {item.daDat ? classGheDaDuocDat != '' ? <UserOutlined /> : <CloseCircleOutlined style={{ marginBottom: '10px' }} /> : item.stt}
          </button>

          {(index + 1) % 10 === 0 ? <br /> : ''}

        </>
      )

    })
  }
  return (
    <div>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="01 Chọn Ghế Và Thanh Toán" key="1">
          <div className="row">
            <div className="col-6 p-5">
              {renderList()}
            </div>

            <div className="col-6 p-5">

              <div className="content p-5">
                <h1 class="text-green text-center">
                  {danhSachGheDangDat.reduce((tongTien, item, index) => {
                    return tongTien += item.giaVe;
                  }, 0).toLocaleString()}</h1>
                <hr />

                <h3>Địa điểm:{thongTinPhim?.tenCumRap}</h3>
                <p>Ngày Chiếu: {thongTinPhim?.tenRap} - {thongTinPhim?.gioChieu}</p>
                <p className='text-center'>{thongTinPhim?.ngayChieu}</p>

                <hr />
                <table className="table">
                  <tr>
                    <td>Ghế
                      <span>
                        {_.sortBy(danhSachGheDangDat, ['stt']).map((item, index) => {
                          return (
                            <span key={index} className='text-green-500 px-2' style={{
                              fontSize: '20px'
                            }}>{item.stt}</span>
                          )
                        })}
                      </span>
                    </td>
                    <td>
                      {danhSachGheDangDat.reduce((tongTien, item, index) => {
                        return tongTien += item.giaVe;
                      }, 0).toLocaleString()}
                    </td>
                  </tr>
                </table>
                <hr />
                <p>Email</p>
                <p>478476</p>
                <hr />
                <p>Phone</p>
                <p>yduiueieio</p>
                <br />
                <button onClick={() => {


                  const thongTinDatVe = new ThongTinDatVe();
                  thongTinDatVe.maLichChieu = params.maLichChieu;
                  thongTinDatVe.danhSachVe = danhSachGheDangDat;
                  console.log(thongTinDatVe);
                  ///
                  const action = getButtonDatVeApi(thongTinDatVe);
                  dispatch(action);
                }} className="btn btn-success">Đặt vé</button>
              </div>
              <div class="table-responsive">
                <table class="table table-primary">
                  <thead>
                    <tr>
                      <th scope="col">Ghế Chưa đặt</th>
                      <th scope="col">Ghế đang đặt</th>
                      <th scope="col">Ghế Vip</th>
                      <th scope="col">Ghế đã đặt</th>
                      <th scope="col">Ghế mình đặt</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="">
                      <td scope="row"></td>
                      <div>
                        <i className="fa fa-check-circle" />
                        <i className="fa fa-check-circle" />
                        <i className="fa fa-check-circle" />
                        <i className="fa fa-check-circle" />
                        <i className="fa fa-check-circle" />
                      </div>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="02 Kết Quả Đặt Vé" key="2">
            <KetQuaThongTinDatVe/>
        </Tabs.TabPane>


        <i18n/>
      </Tabs>







    </div>
  )
}

