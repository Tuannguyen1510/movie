import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import '../../assets/css/circle.css'
import { Rate } from 'antd';
import { Radio, Space, Tabs } from 'antd';
// import { Tabs } from 'antd';


import { getAllLayThongTinRapChieuPhim } from '../../redux/reducers/QuanLyRapPhimReducer';


const { TabPane } = Tabs;

export default function Detail() {

  const [state, setState] = useState({
    tabPosition: 'left',
  })

  const changeTabPosition = (e) => {
    setState({ tabPosition: e.target.value });
  };

  const { tabPosition } = state;


  function callback(key) {
    console.log(key);
  }





  const { filmDetail } = useSelector(state => state.QuanLyRapPhimReducer);
  console.log(filmDetail);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const actionAsync = getAllLayThongTinRapChieuPhim(params.maPhim);
    dispatch(actionAsync);
  }, [params.maPhim]);



  return (
    <div>

      <div className="row container mt-5">
        <div className="col-8 img">
          <div className="row ">
            <div className="col-6">
              <img src={filmDetail.hinhAnh} alt="" width={500} height={500} />
            </div>
            <div className="col-6">
              <p>Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD - MM - YYYY')}</p>
              <h1>{filmDetail.tenPhim}</h1>
              <p>{filmDetail.moTa}</p>
            </div>
          </div>
        </div>
        <div className="clearfix col-4">
          <h1 >Đánh giá</h1>
          <h1><Rate allowHalf defaultValue={filmDetail.danhGia / 2} /></h1>
          <div className={`c100 p${filmDetail.danhGia * 10} big`}>
            <span>{filmDetail.danhGia * 10}</span>
            <div className="slice">
              <div className="bar" />
              <div className="fill" />
            </div>
          </div>
        </div>
      </div>



      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Lịch Chiếu" key="1">
          <Tabs tabPosition={tabPosition}>
            {filmDetail.heThongRapChieu?.map((item, index) => {
              return (
                <TabPane tab={
                  <div>
                    <img src={item.logo} alt="" width={50} height={50} />
                    {item.tenHeThongRap}
                  </div>}
                  key={index}>
                  {item.cumRapChieu?.map((cumRap, index) => {
                    return (
                      <div key={index}>
                        <div className="row mt-4">
                          <div className="col-2">
                            <img src='https://taoanhdep.com/wp-content/uploads/2022/08/hinh-nen-chill-350x265.jpeg' width={100} heigt={100} alt="" />
                          </div>
                          <div className="col-10">
                            <h1>{cumRap.tenCumRap}</h1>
                            <p>{cumRap.tenCumRap}</p>
                          </div>
                        </div>
                        <div className="row mt-5">
                          {cumRap.lichChieuPhim?.slice(0, 12).map((lichchieu, index) => {
                            return (
                            <NavLink to={`/checkout/${lichchieu.maLichChieu}`} key={index}  className="col-3" style={{color:'red'}}>
                              <div>
                                {moment(lichchieu.ngayChieuPhim).format('hh: mm A')}
                              </div>
                            </NavLink>
                            )
                          })}
                        </div>


                      </div>
                    )
                  })}
                </TabPane>
              )
            })}
          </Tabs>
        </TabPane>
        <TabPane tab="Thông tin" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Đánh Giá" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>,






    </div>
  )
}
