import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import '../../assets/css/circle.css'
import { Rate } from 'antd';
import { Radio, Space, Tabs, Button } from 'antd';
import ReactDOM from 'react-dom'
import ModalVideo from 'react-modal-video'

import { YoutubeOutlined, PlayCircleOutlined } from '@ant-design/icons';
////
// import { Tabs } from 'antd';


import { getAllLayThongTinRapChieuPhim } from '../../redux/reducers/QuanLyRapPhimReducer';


const { TabPane } = Tabs;

export default function Detail() {

  const [state, setState] = useState({
    tabPosition: 'left',
  })
  const changeTabPosition = (e) => {
    setState({
      tabPosition: e.target.value
    });
  };

  const { tabPosition } = state;


  function callback(key) {
    console.log(key);
  }





  const { filmDetail } = useSelector(state => state.QuanLyRapPhimReducer);
  // console.log(filmDetail);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const actionAsync = getAllLayThongTinRapChieuPhim(params.maPhim);
    dispatch(actionAsync);
  }, [params.maPhim]);



  const [isOpen, setOpen] = useState(false);
  // const url = filmDetail.trailer;
  // console.log(url.split("/").pop());
  // const id = url.split("/").pop();



  return (
    <div id="detail" style={{
      backgroundImage: `url(${filmDetail.hinhAnh})`
    }}>
      <div class="card">
        <div className="row detail-Titel">
          <div className="col-8 img mx-md-auto mx-sm-auto mx-auto">
            <div className="row ">
              <div className="col-lg-6 col-md-12 col-12 card-video">
                <div className="img">
                  <img src={filmDetail.hinhAnh} alt="" style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }} />
                </div>

              </div>
              <div className="col-lg-6 col-md-12 col-12 mt-3">
                <p style={{ color: 'White', fontSize: 20, fontWeight: 'bold' }}>Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD - MM - YYYY')}</p>
                <h1 style={{ color: 'White', fontSize: 18, fontWeight: 'bold' }}>{filmDetail.tenPhim}</h1>
                <p >{filmDetail.moTa}</p>
                <div className="buttonMuaVe d-flex">
                  <div className="video">
                    <React.Fragment>
                      <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={filmDetail.trailler} onClose={() => setOpen(false)} />
                      <button className="btn-primary" onClick={() => setOpen(true)}><PlayCircleOutlined style={{ width: "100px", height: "100px" }} /></button>
                    </React.Fragment>
                  </div>
                  <div className="dat">
                  <button src="#Ve">Mua vé</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix col-4 pl-5 text-center d-lg-block d-md-none d-none">
            {/* <h1 >Đánh giá</h1> */}
            <div className={`c100 p${(filmDetail.danhGia * 10)} big`}>
              <span>{(filmDetail.danhGia * 10)}%</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>

        </div>


        <div className="details-tab" id="Ve">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Lịch Chiếu" key="1">
              <section className="bg-slate-100 py-8 lg:py-16 text-dark">
                <div className="max-w-2xl mx-auto px-4">
                  <div className="justify-between items-center mb-6">
                    <Tabs tabPosition={tabPosition}>
                      {filmDetail.heThongRapChieu?.map((item, index) => (
                        <TabPane tab={<div>

                          <div className="">
                            <img src={item.logo} alt="" width={50} height={50} />
                          </div>


                          <div style={{ color: 'green', marginTop: 5 }}>
                            {item.tenHeThongRap}
                          </div>
                        </div>}
                          key={index}>
                          {item.cumRapChieu?.map((cumRap, index) => {
                            return (
                              <div key={index}>
                                <div className="row mt-4">
                                  <div className="col-lg-3 col-md-12">
                                    <img src={cumRap.hinhAnh} alt="" style={{ width: 100, height: 100, objectFit: 'contain' }} />
                                  </div>
                                  <div className="col-lg-9 col-12 mt-3">
                                    <h1 style={{
                                      color: 'rgb(139, 195, 74)',
                                      fontSize: 16,
                                      marginLeft: 10
                                    }}>{cumRap.tenCumRap}</h1>
                                    <div className="row mt-2">
                                      {cumRap.lichChieuPhim?.map((lichchieu, index) => {
                                        return (
                                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                                            <NavLink to={`/checkout/${lichchieu.maLichChieu}`} key={index} className="col-3" style={{ color: 'red' }}>
                                              <div style={{ paddingLeft: 10 }}>
                                                <Button success>
                                                  <span style={{
                                                    color: '#108f3e',
                                                    fontWeight: 500
                                                  }}>{moment(lichchieu.ngayChieuGioChieu).format('DD/MM/YYYY')}</span>
                                                  <span>~</span>
                                                  <span style={{
                                                    color: 'red',
                                                    fontWeight: 500
                                                  }}> {moment(lichchieu.ngayChieuGioChieu).format('hh:mm A')}</span>
                                                </Button>
                                              </div>
                                            </NavLink>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>

                              </div>
                            );
                          })}
                        </TabPane>
                      ))}
                    </Tabs>

                  </div>
                </div>
              </section>

            </TabPane>
            <TabPane tab="Thông tin" key="2">

              <section className="bg-slate-100 py-8 lg:py-16 text-dark">
                <div className="max-w-2xl mx-auto px-4">
                  <div className="flex justify-between items-center mb-6">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-12">
                        <table cellPadding={10}>
                          <tbody >
                            <td>Ngày công chiếu:</td>
                            <td>{moment(filmDetail.ngayKhoiChieu).format('DD/MM/YYYY')}</td>
                          </tbody>
                          <tbody >
                            <td>Giờ chiếu:</td>
                            <td>{moment(filmDetail.ngayKhoiChieu).format('hh:mm A')}</td>
                          </tbody>
                          <tbody >
                            <td>Video giới thiệu:</td>
                            <td>
                              <div className="video" style={{ color: 'red', fontSize: 15 }}>

                              </div>
                            </td>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-lg-6 col-md-12 col-12">
                        <h3>Nội dung</h3>
                        <p>{filmDetail.moTa}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </TabPane>
            <TabPane tab="Đánh Giá" key="3">
              <section className="bg-slate-500 dark:bg-gray-900 py-8 lg:py-16">
                <div className="max-w-2xl mx-auto px-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
                  </div>
                  <form className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <label htmlFor="comment" className="sr-only">Your comment</label>
                      <textarea id="comment" rows={6} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-dark dark:placeholder-gray-400 dark:bg-white" placeholder="Write a comment..." required defaultValue={""} />
                    </div>
                    <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-red bg-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                      Post comment
                    </button>
                  </form>
                  <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough" />Michael Gough</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate dateTime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time></p>
                      </div>
                      <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                          </path>
                        </svg>
                        <span className="sr-only">Comment settings</span>
                      </button>

                      <div id="dropdownComment1" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                          </li>
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                          </li>
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                          </li>
                        </ul>
                      </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                      instruments for the UX designers. The knowledge of the design tools are as important as the
                      creation of the design strategy.</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        Reply
                      </button>
                    </div>
                  </article>
                  <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Jese Leos" />Jese Leos</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate dateTime="2022-02-12" title="February 12th, 2022">Feb. 12, 2022</time></p>
                      </div>
                      <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                          </path>
                        </svg>
                        <span className="sr-only">Comment settings</span>
                      </button>

                      <div id="dropdownComment2" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                          </li>
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                          </li>
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                          </li>
                        </ul>
                      </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">Much appreciated! Glad you liked it ☺️</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        Reply
                      </button>
                    </div>
                  </article>
                  <article className="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie Green" />Bonnie Green</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate dateTime="2022-03-12" title="March 12th, 2022">Mar. 12, 2022</time></p>
                      </div>
                      <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                          </path>
                        </svg>
                        <span className="sr-only">Comment settings</span>
                      </button>

                      <div id="dropdownComment3" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                          </li>
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                          </li>
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                          </li>
                        </ul>
                      </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        Reply
                      </button>
                    </div>
                  </article>
                  <article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="Helene Engels" />Helene Engels</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate dateTime="2022-06-23" title="June 23rd, 2022">Jun. 23, 2022</time></p>
                      </div>
                      <button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                          </path>
                        </svg>
                      </button>

                      <div id="dropdownComment4" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                          </li>
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                          </li>
                          <li>
                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                          </li>
                        </ul>
                      </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        Reply
                      </button>
                    </div>
                  </article>
                </div>
              </section>

            </TabPane>
          </Tabs>

        </div>


      </div>
    </div>
  )
}
