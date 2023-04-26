import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LayLichSuDatVeAPI } from '../../redux/reducers/QuanLyNguoiDung';
import useSelection from 'antd/es/table/hooks/useSelection';
import moment from 'moment';
import _ from 'lodash';
export default function KetQuaThongTinDatVe() {
  const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDung);
  const { userLogin } = useSelector(state => state.QuanLyNguoiDung)
  const dispatch = useDispatch();
  useEffect(() => {
    const actionthunk = LayLichSuDatVeAPI();
    dispatch(actionthunk);
  }, [])
  // console.log("Thông tin nd" , thongTinNguoiDung);


  const renderTicketItem = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const tickets = _.first(ticket.danhSachGhe)
      return (
        <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none" />
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">{index+1}</div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            {/* <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-12 h-12" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            </div> */}
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">{ticket.tenPhim}</h2>
              <p className="leading-relaxed">{moment(ticket.ngayDat).format('hh:mm A')} / {moment(ticket.ngayDat).format('DD-MM-YYY')}</p>
              <p>Địa điểm: {tickets.tenHeThongRap} - {tickets.tenCumRap}</p>
              <p>Ghế:  {ticket.danhSachGhe.map((ghe, index) => {
                return (
                  <span key={index} style={{
                    color:'red',
                    marginLeft: 10
                  }}>
                    [{ghe.tenGhe}]
                  </span>
                )
              })}</p>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          {renderTicketItem()}
        </div>
      </section>
    </div>
  )
}
