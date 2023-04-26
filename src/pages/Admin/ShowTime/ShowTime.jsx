import React, { useEffect, useState } from 'react'
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { http } from '../../../util/config';
import { useDispatch, useSelector } from 'react-redux';
import { LayThongTinCumRapTheoHeThong, LayThongTinHeThongRap } from '../../../redux/reducers/QuanLyRapPhimReducer';
import { useFormik } from 'formik';
import { values } from 'lodash';
import moment from 'moment';
import { taoLichChieu } from '../../../redux/reducers/QuanLyDatPhimReducer';

export default function ShowTime(props) {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { heThongRapChieu, cumRapChieu } = useSelector(state => state.QuanLyRapPhimReducer)

  const handleChangeHeThongRap = (value, option) => {
    console.log('maHeThongRap', value, option);
    // return (value)
  }

  const handleChangeCumRap = (value) => {
    console.log('maRap', value);
    formik.setFieldValue('maRap', value)
    // return (value)
  }


  const dispatch = useDispatch();
  useEffect(() => {
    const actionThunk = LayThongTinHeThongRap();
    dispatch(actionThunk);
  }, [])


  useEffect((value) => {
    const actionThunk1 = LayThongTinCumRapTheoHeThong(handleChangeHeThongRap())
    dispatch(actionThunk1)
  }, [])
  // console.log(heThongRapChieu);

const formik = useFormik({
  initialValues: {
    maPhim: props.match.params.maPhim,
    ngayChieuGioChieu: '',
    maRap: '',
    giaVe: '',
  }, 
  onSubmit: (values) => {
    console.log(values);
    const actionThunk = taoLichChieu(values);
    dispatch(actionThunk);

  }
})
  const onChangeDate = (values) => {
     formik.setFieldValue('ngayChieuGioChieu', moment(values).format("DD/MM/YYYY hh:mm:ss"));
     console.log('values',moment(values).format("DD/MM/YYYY hh:mm:ss"));
  }

  const onOk = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format("DD/MM/YYYY hh:mm:ss"));
    console.log('values',moment(values).format("DD/MM/YYYY hh:mm:ss"));
  }
  const onChangeInputNumber = (values) => {
    formik.setFieldValue('giaVe', values)
  }





  const renderHeThongRap = () => {
    return heThongRapChieu.map((item, index) => {
      return (
        { value: item.tenHeThongRap, label: item.tenHeThongRap }
      )
    })
  }



  const renderHeThongCumRap = () => {
    return cumRapChieu?.map((item, index) => {
      return (
        { value: item.maCumRap, label: item.tenCumRap }
      )
    })
  }
  let films = {};
if(localStorage.getItem('flimsParam')){
  films = JSON.parse(localStorage.getItem('flimsParam'))
}
 
  // 

  return (
    <div>
      <h1 style={{ color: 'green', textAlign: 'center', fontSize: '20px' }}>Tạo lịch chiếu- {props.match.params.tenphim}</h1>
      <img src={films.hinhAnh} alt="" style={{
          width:'200px',
          height: '300px',
          margin:'auto',
          marginBottom:30
      }}/>
    
    
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onSubmitCapture={formik.handleSubmit}
      >

        <Form.Item label="Hệ thống rạp">
          <Select
            options={renderHeThongRap()}
            onChange={handleChangeHeThongRap}
            placeholder="Chọn hệ thống rạp"
          />
        </Form.Item>

        <Form.Item label="Cụm rạp">
          <Select
            options={renderHeThongCumRap()}
            onChange={handleChangeCumRap}
            placeholder="Chọn cụm Rạp"
          />
        </Form.Item>


        <Form.Item label="Ngày chiếu giờ chiếu">
          <DatePicker format={"DD/MM/YYYY hh:mm:ss"} showTime onChange={onChangeDate} onOk={onOk} />
        </Form.Item>


        <Form.Item label="Giá vé">
          <InputNumber min={75000} max={150000} onChange={onChangeInputNumber} />
        </Form.Item>

        <Form.Item label="Cập nhật">
          <Button htmlType="submit">Tạo lịch chiếu</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

