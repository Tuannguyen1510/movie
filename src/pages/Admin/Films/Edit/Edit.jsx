import React, { useEffect } from 'react'
import { useFormik } from 'formik';


import { Switch } from 'antd';
import { Input } from 'antd';

import { DatePicker, Radio, Space } from 'antd';
import { useState } from 'react';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { values } from 'lodash';
import { UpdatePhimUpLoadApi, themPhimUpLoadApi, updatePhimUpLoadApiAction } from '../../../../redux/reducers/QuanLyPhimReducer';
import { LayThongTinDatVeActionAPI } from '../../../../redux/reducers/QuanLyNguoiDung';
import { EditPhimUpLoadApi } from '../../../../redux/reducers/QuanLyPhimReducer'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { InputNumber } from 'antd';

const { RangePicker } = DatePicker;

// 
const { TextArea } = Input;
const onChange = (e) => {
    console.log('Change:', e.target.value);
};

export default function Edit() {
    const [imgSrc, setImg] = useState('');


    const dispatch = useDispatch();
///  lấy phim khi chọn rồi edit 
    const params = useParams();
    useEffect(() => {
        const actionAsync = EditPhimUpLoadApi(params.maPhim);
        dispatch(actionAsync);
    }, [params.maPhim]);
/// 
const {thongTinPhim} = useSelector(state => state.QuanLyPhimReducer);
// console.log(thongTinPhim);
    const formik = useFormik({
        enableReinitialize: true, // thay đổi set state 

        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim?.tenPhim,
            moTa: thongTinPhim?.moTa,
            trailer: thongTinPhim?.trailer,
            hot: thongTinPhim?.hot,
            hinhAnh: null,   /// giữ hình cũ 
            danhGia: thongTinPhim?.danhGia,
            dangChieu: thongTinPhim?.dangChieu,
            ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
            sapChieu: thongTinPhim?.sapChieu,
            maNhom: 'GP11'
            //   email: '',
        },
        onSubmit: values => {
            console.log('log', values);
            // const actionThunk = loginApi(values);
            // dispatch(actionThunk);
            // Tao doi tuong 
            values.maNhom = 'GP11';
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if(values.hinhAnh !== null){
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }
            // api 

            const actionThunk = UpdatePhimUpLoadApi(formData);
            dispatch(actionThunk);
        },
    });

    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
        formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
    }
    const onChangeSwitch = (name) => {
        return (checked) => {
            formik.setFieldValue(name, checked);
        }
    }
    const changeNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }
    
    const handleChangeImg = async(e) => {
        /// Lấy file
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            // do chạy bất đồng bộ lên đưa formik lên trước 
            await formik.setFieldValue('hinhAnh', file);
           
           
            // Tạo đối tượng 
            let reader = new FileReader();
            reader.readAsDataURL(file);


            reader.onload = (e) => {
                setImg(e.target.result);
            }
            ///
           
        }

    }
    return (
        <div>
        <h5 className="text-center pb-5" style={{ color: 'green', fontSize: '25px' }}>Thêm Phim </h5>
        <form onSubmit={formik.handleSubmit}>
            <div>  
                    <div className="mt-5 md:col-span-2 md:mt-0 margin-auto">

                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                        Tên Phim
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            onChange={formik.handleChange}
                                            value={formik.values.tenPhim}  // set tên phim 
                                            id="about"
                                            name="tenPhim"
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="Viết tên phim"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                        Trailer
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            onChange={formik.handleChange}
                                            value={formik.values.trailer} 
                                            id="about"
                                            name="trailer"
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="Viết trailer của phim"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                        Mô tả
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            onChange={formik.handleChange}
                                            value={formik.values.moTa} 
                                            id="about"
                                            name="moTa"
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="Viết mô tả của phim"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                                    <div className="mt-1 flex items-center">
                                        <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </span>
                                        <button
                                            type="button"
                                            className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Change</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChangeImg} />
                                            </label>
                                        </button>
                                    </div>
                                </div>
                                {/* Cover ảnh  */}
                                <img src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc } alt="" width={100} height={100} />


                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                Đang chiếu
                                            </label>
                                            <br />
                                            <Switch defaultChecked onChange={onChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Sắp chiếu
                                            </label>
                                            <br />
                                            <Switch defaultChecked onChange={onChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Độ Hot
                                            </label>
                                            <br />
                                            <Switch defaultChecked onChange={onChangeSwitch('hot')} checked={formik.values.hot} />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Ngày chiếu
                                            </label>
                                            <br />
                                            <DatePicker size={20} format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)}/>
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Số Sao
                                            </label>
                                            <fieldset>
                                                <div className="mt-4 space-y-4">
                                                    <div className="flex items-center">
                                                    <InputNumber onChange={changeNumber('danhGia')} value={formik.values.danhGia}/>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Save
                                </button>

                            </div>
                        </div>
                    </div>

            </div>
        </form>
    </div>
    )
}
