import React, { useEffect, useState } from 'react'
import { Radio, Space, Tabs, Button, List, Skeleton, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCumQuanLyRapApi } from '../../redux/reducers/QuanLyRapPhimReducer';
import { NavLink } from 'react-router-dom';
import moment from 'moment'

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;


const { TabPane } = Tabs;


export default function HomeMenu() {
  // 
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  // 
  const { heThongRapChieu } = useSelector(state => state.QuanLyRapPhimReducer);
  console.log(heThongRapChieu.lstCumRap);



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
          <TabPane tab={<img src={item.logo} className='rounded-full rapLogo' width="50" style={{
            // borderBottom: '1px solid gray',
            // display:'block'
          
          }} />} key={index}>
            <Tabs tabPosition={tabPosition}>
              {item.lstCumRap?.map((cumRap, index) => {   //      item.lstCumRap?.slice(0,6).map
                return (
                  <TabPane tab={<div className='listRap-CumRap' style={{
                    width: '250px',
                    display: 'flex'
                  }}>
                    {/* <img src={cumRap.hinhAnh} style={{ height: '70px', width: '70px' }} alt="" /> */}
                    <br />
                    <div className="text-left ml-2" style={{
                      fontWeight: '500',
                      color: '#108f3e',
                    }}>
                      {cumRap.tenCumRap.slice(0, 20)}....
                      <p style={{ fontWeight: 'initial', color: 'gray', marginBottom: '0px' }}>{cumRap.diaChi.slice(0, 30)}....</p>
                      <p className='text-red-200'> [ Chi tiết ]</p>
                    </div>
                  </div>} key={index}>

                    {/* Load Phim */}
                    {cumRap.danhSachPhim.map((film, index) => {    // danhSachPhim.slice(0,5).map((film, index)
                    return (
                        <div key={index}>
                          <div className="ml-2 mt-1 py-3" style={{ display: 'flex' }} >
                            <div style={{ display: 'flex' }} >
                              <img src={film.hinhAnh} alt="" style={{ height: '150px', width: '100px',objectFit:'cover',borderBottom:'1px solid gray' }} onError={(e) => {
                                e.target.onerror = null; e.target.src = 'https://picsum.photos/75/75'
                              }} />
                              <div className="ml-5">
                                <span style={{
                                  borderRadius: '15px',
                                  background: 'red',
                                  color: 'white',
                                  padding: '5px 8px',
                                  marginRight: '5px',
                                  fontWeight: 'bold'
                                }}>C18</span>
                                <span className='' style={{ fontWeight: '500', color: 'black', fontSize: '18px', marginBottom: '10px' }}>{film.tenPhim.slice(0,30)}</span>
                                <div className="row listRap-LichChieu ">
                                  {film.lstLichChieuTheoPhim?.slice(0,12).map((lichChieu, index) => {    ///  lstLichChieuTheoPhim?.slice(0, 12).
                                    return (
                                      <NavLink to='/' key={index} className='text-green col-6 mt-3'>
                                        <Button success>
                                          <span style={{
                                            color: '#108f3e',
                                            fontWeight: 500
                                          }}>{moment(lichChieu.ngayChieuGioChieu).format('DD/MM/YYYY')}</span>
                                          <span>~</span>
                                          <span style={{
                                            color: 'red',
                                            fontWeight: 500
                                          }}> {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}</span>
                                        </Button>
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
    <div className='container listRap'>
      <div className="listRap-content">
        <div className="listRap-pd">
          <Tabs tabPosition={tabPosition}>
            {renderRapChieu()}
          </Tabs>
        </div>
      </div>
      {/* <p>{heThongRapChieu.maHeThongRap}</p>
      <img src={heThongRapChieu.logo} alt="" /> */}
    </div>



  )
}
