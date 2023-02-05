import React, { useEffect, useState } from 'react'
import { Radio, Space, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCumQuanLyRapApi } from '../../redux/reducers/QuanLyRapPhimReducer';
import { NavLink } from 'react-router-dom';
import moment from 'moment'
const { TabPane } = Tabs;


export default function HomeMenu() {
  const { heThongRapChieu } = useSelector(state => state.QuanLyRapPhimReducer);
  const [state, setState] = useState({
    tabPosition: 'left',
  })

  const changeTabPosition = (e) => {
    setState({ tabPosition: e.target.value });
  };

  const { tabPosition } = state;



  const dispatch = useDispatch();
  useEffect(() => {
    const actionThunk = getAllCumQuanLyRapApi()
    dispatch(actionThunk)
  }, [])

  const renderRapChieu = () => {
    return (
      heThongRapChieu?.map((item, index) => {
        return (
          <TabPane tab={<img src={item.logo} className='rounded-full' width="50" />} key={index}>
            <Tabs tabPosition={tabPosition}>
              {item.lstCumRap?.slice(0,6).map((cumRap, index) => {
                return (
                  <TabPane tab={<div style={{
                    width: '300px',
                    display: 'flex'
                  }}>
                    <img src="https://dulichbui.org/wp-content/uploads/2015/05/chup-anh-film.jpg" width={50} alt="" />
                    <br />
                    <div className="text-left ml-2">
                      {cumRap.tenCumRap}
                      <p className='text-red-200'>Chi tiết</p>
                    </div>
                  </div>} key={index}>

                    {/* Load Phim */}
                    {cumRap.danhSachPhim.slice(0,5).map((film, index) => {
                      return (
                        <div key={index}>
                          <div className="my-5" style={{ display: 'flex' }} >
                            <div style={{ display: 'flex' }} >
                              <img src={film.hinhAnh} alt="" width={100} height={100} onError= {(e) => {
                                e.target.onerror =  null ; e.target.src = 'https://picsum.photos/75/75'
                              }}/>
                             <div className="ml-2">
                             <h1 className='text-2xl text-green-700'>{film.tenPhim}</h1>
                              <p>{cumRap.diaChi}</p>
                              <div className="grid grid-cols-6 gap-6">

                                {film.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                                  return (
                                    <NavLink to='/' key={index} className='text-2xl text-green-400'>
                                      {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                    </NavLink>
                                  )
                                })}
                              </div>
                             </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </TabPane>
                )
              })}
            </Tabs>
          </TabPane>
        )
      })
    )
  }



  return (
    <div>
      <Tabs tabPosition={tabPosition}>
        {renderRapChieu()}
      </Tabs>
      {/* <p>{heThongRapChieu.maHeThongRap}</p>
      <img src={heThongRapChieu.logo} alt="" /> */}
    </div>



  )
}
