import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLayThongTinDatVe, getDatVe, getButtonDatVeApi, getQuayLai, getChuyenTag } from '../../redux/reducers/QuanLyDatPhimReducer';
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


// chuyển tag 
const {tabActive} = useSelector(state => state.QuanLyDatPhimReducer)

// console.log((tabActive));





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
            // const itemCart = { ...item };
            // const action = getDatVe(item);
            dispatch(action);
            console.log(danhSachGheDangDat);
          }}
            disabled={item.daDat} className={`ghe text-center ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} `} key={index}>
            {item.daDat ? classGheDaDuocDat != '' ? <UserOutlined /> : <CloseCircleOutlined style={{ marginBottom: '10px' }} /> : item.stt}
          </button>

          {(index + 1) % 14 === 0 ? <br /> : ''}

        </>
      )

    })
  }
  return (
    <div id="datVe">

      <Tabs defaultActiveKey="1" >
{/*         
      <Tabs defaultActiveKey="1" activeKey={tabActive.toString()}  onChange={(key) => {
           dispatch(getChuyenTag({
            number : 1
           }
           ))
      }}></Tabs> */}
        <Tabs.TabPane tab="01 Chọn Ghế Và Thanh Toán" key="1" >
          <div className="row">
            <div className="col-8 datVe-left">
              {renderList()}
            </div>

            <div className="col-4 datVe-right">

              <div className="content">
                <h1 class="text-green text-center"style={{
                      color: 'rgb(139, 195, 74)',
                      fontSize:35
                }}>
                  {danhSachGheDangDat.reduce((tongTien, item, index) => {
                    return tongTien += item.giaVe;
                  }, 0).toLocaleString()} VND</h1>

                  <table class="table-tinhTien" style={{
                    width:'100%',
                    padding:'20px'
                  }}>
                     <thead>
                       <td class='datVe-name'>Khách hàng</td>
                       <td class='datVe-content' style={{
                        textAlign:'right',
                        color:'red'
                       }}>{userLogin.hoTen}</td>
                    </thead>
                    <thead>
                       <td class='datVe-name'>Cụm Rạp</td>
                       <td class='datVe-content' style={{
                        textAlign:'right'
                       }}>{thongTinPhim?.tenCumRap}</td>
                    </thead>
                    <thead>
                       <td class='datVe-name'>Địa Chỉ</td>
                       <td class='datVe-content' style={{
                        textAlign:'right'
                       }}>{thongTinPhim?.diaChi}</td>
                    </thead>
                    <thead>
                       <td class='datVe-name'>Rạp</td>
                       <td class='datVe-content' style={{
                        textAlign:'right'
                       }}>{thongTinPhim?.tenRap}</td>
                    </thead>
                    <thead>
                       <td class='datVe-name'>Ngày Chiếu</td>
                       <td class='datVe-content' style={{
                        textAlign:'right'
                       }}>{thongTinPhim?.ngayChieu}</td>
                    </thead>
                    <thead>
                       <td class='datVe-name'>Tên Phim</td>
                       <td class='datVe-content' style={{
                        textAlign:'right'
                       }}>{thongTinPhim?.tenPhim}</td>
                    </thead>
                    <thead>
                       <td class='datVe-name'>Chọn ghế</td>
                       <td class='datVe-content' style={{
                        textAlign:'right'
                       }}>     <span>
                       {_.sortBy(danhSachGheDangDat, ['stt']).map((item, index) => {
                         return (
                           <span key={index} className='text-red px-1' style={{
                             fontSize: '16px'
                           }}>Ghế{item.stt}, </span>
                         )
                       })}
                     </span> </td>
                    </thead>
                    <thead>
                    <td class='datVe-name'>Tổng tiền</td>
                       <td class='datVe-content' style={{
                        textAlign:'right'
                       }}>  {danhSachGheDangDat.reduce((tongTien, item, index) => {
                        return tongTien += item.giaVe;
                      }, 0).toLocaleString()} VND</td>
                    </thead>
                  </table>


             
           
                <button onClick={() => {
                  const thongTinDatVe = new ThongTinDatVe();
                  thongTinDatVe.maLichChieu = params.maLichChieu;
                  thongTinDatVe.danhSachVe = danhSachGheDangDat;
                  // console.log((danhSachGheDangDat));
                  // console.log(thongTinDatVe);
                  ///
                  const action = getButtonDatVeApi(thongTinDatVe);
                  dispatch(action);
                }} class="btnDatVe" >Đặt vé</button>
              </div>



              <div class="table-responsive pt-3">
                <table class="table">
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
                    <tr>
                      <th><button class="ghe text-center">x</button></th>
                      <th><button class="ghe text-center gheDangDat gheDangDat">x</button></th>
                     <th><button class="ghe text-center gheVip">x</button></th>
                     <th><button disabled="" class="ghe text-center  gheDaDat"><CloseCircleOutlined style={{ marginBottom: '10px' }} /> </button></th>
                     <th><button class="ghe text-center gheDaDuocDat"><UserOutlined /></button></th>
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

