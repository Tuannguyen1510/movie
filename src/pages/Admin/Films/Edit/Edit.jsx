// import React, { useEffect } from 'react'
// import { useFormik } from 'formik';


// import { Switch } from 'antd';
// import { Input } from 'antd';

// import { DatePicker, Radio, Space } from 'antd';
// import { useState } from 'react';
// import moment from 'moment/moment';
// import { useDispatch, useSelector } from 'react-redux';
// import { values } from 'lodash';
// import { EditPhimUpLoadApi, themPhimUpLoadApi } from '../../../../redux/reducers/QuanLyPhimReducer';
// import { useParams } from 'react-router-dom';
// const { RangePicker } = DatePicker;

// // 
// const { TextArea } = Input;
// const onChange = (e) => {
//     console.log('Change:', e.target.value);
// };

// export default function AddFilms() {
//     const [imgSrc, setImg] = useState('');
//     const dispatch = useDispatch();



//     const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);


//     const params = useParams();

//     useEffect(() => {
//         const actionAsync = EditPhimUpLoadApi(params.maPhim);
//         dispatch(actionAsync);
//     }, [params.maPhim]);
//     console.log('hhh', thongTinPhim);


//     const formik = useFormik({
//         initialValues: {
//             tenPhim: thongTinPhim?.tenPhim,
//             moTa: thongTinPhim?.moTa,
//             trailer: thongTinPhim?.trailer,
//             hot: thongTinPhim?.hot,
//             hinhAnh: null,
//             danhGia: thongTinPhim?.danhGia,
//             dangChieu: thongTinPhim?.dangChieu,
//             ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
//             sapChieu: thongTinPhim.sapChieu
//             //   email: '',
//         },
//         onSubmit: values => {
//             console.log('log', values);
//             // const actionThunk = loginApi(values);
//             // dispatch(actionThunk);
//             // Tao doi tuong 
//             values.maNhom = 'GP09';
//             let formData = new FormData();
//             for (let key in values) {
//                 if (key !== 'hinhAnh') {
//                     formData.append(key, values[key]);
//                 } else {
//                     formData.append('File', values.hinhAnh, values.hinhAnh.name);
//                 }
//             }
//             // api 
//             const actionThunk = themPhimUpLoadApi(formData);
//             dispatch(actionThunk);
//         },
//     });

//     const handleChangeDatePicker = (value) => {
//         let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
//         formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
//     }
//     const onChangeSwitch = (name) => {
//         return (checked) => {
//             formik.setFieldValue(name, checked);
//         }
//     }
//     const handleChangeImg = (e) => {
//         /// Lấy file
//         let file = e.target.files[0];



//         if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
//             // Tạo đối tượng 
//             let reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = (e) => {
//                 setImg(e.target.result);
//             }
//             ///
//             formik.setFieldValue('hinhAnh', file);
//         }

//     }






//     return (
//         <div>
//             <h5 className="text-center pb-5" style={{ color: 'green', fontSize: '25px' }}>Thêm Phim </h5>
//             <form onSubmit={formik.handleSubmit}>
//                 <div>
//                     <div className="md:grid md:grid-cols-3 md:gap-6">
//                         <div className="md:col-span-1">
//                             <div className="px-4 sm:px-0">
//                                 <h3 className="text-base font-semibold leading-6 text-gray-900">Giới thiệu Phim</h3>
//                                 <p className="mt-1 text-sm text-gray-600">
//                                     This information will be displayed publicly so be careful what you share.
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="mt-5 md:col-span-2 md:mt-0">

//                             <div className="shadow sm:overflow-hidden sm:rounded-md">
//                                 <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
//                                     <div>
//                                         <label htmlFor="about" className="block text-sm font-medium text-gray-700">
//                                             Tên Phim
//                                         </label>
//                                         <div className="mt-1">
//                                             <textarea
//                                                 onChange={formik.handleChange}
//                                                 value={formik.values.tenPhim}
//                                                 id="about"
//                                                 name="tenPhim"
//                                                 rows={3}
//                                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                                                 placeholder="Viết tên phim"
//                                                 defaultValue={''}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <label htmlFor="about" className="block text-sm font-medium text-gray-700">
//                                             Trailer
//                                         </label>
//                                         <div className="mt-1">
//                                             <textarea
//                                                 onChange={formik.handleChange}
//                                                 value={formik.values.trailer}
//                                                 id="about"
//                                                 name="trailer"
//                                                 rows={3}
//                                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                                                 placeholder="Viết trailer của phim"
//                                                 defaultValue={''}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <label htmlFor="about" className="block text-sm font-medium text-gray-700">
//                                             Mô tả
//                                         </label>
//                                         <div className="mt-1">
//                                             <textarea
//                                                 onChange={formik.handleChange}
//                                                 value={formik.values.moTa}
//                                                 id="about"
//                                                 name="moTa"
//                                                 rows={3}
//                                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                                                 placeholder="Viết mô tả của phim"
//                                                 defaultValue={''}
//                                             />
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700">Photo</label>
//                                         <div className="mt-1 flex items-center">
//                                             <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
//                                                 <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
//                                                     <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
//                                                 </svg>
//                                             </span>
//                                             <button
//                                                 type="button"
//                                                 className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                             >
//                                                 <label
//                                                     htmlFor="file-upload"
//                                                     className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
//                                                 >
//                                                     <span>Change</span>
//                                                     <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChangeImg} />
//                                                 </label>
//                                             </button>
//                                         </div>
//                                     </div>


//                                     {/* Cover ảnh  */}
//                                     <img src={imgSrc === '' ? thongTinPhim.hinhAnh: imgSrc} alt="" width={100} height={100} />




//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700">Cover photo</label>
//                                         <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
//                                             <div className="space-y-1 text-center">
//                                                 <svg
//                                                     className="mx-auto h-12 w-12 text-gray-400"
//                                                     stroke="currentColor"
//                                                     fill="none"
//                                                     viewBox="0 0 48 48"
//                                                     aria-hidden="true"
//                                                 >
//                                                     <path
//                                                         d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                                                         strokeWidth={2}
//                                                         strokeLinecap="round"
//                                                         strokeLinejoin="round"
//                                                     />
//                                                 </svg>
//                                                 <div className="flex text-sm text-gray-600">
//                                                     <label
//                                                         htmlFor="file-upload"
//                                                         className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
//                                                     >
//                                                         <span>Upload a file</span>
//                                                         <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChangeImg} />
//                                                     </label>
//                                                     <p className="pl-1">or drag and drop</p>
//                                                 </div>
//                                                 <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                                             </div>
//                                         </div>
//                                     </div>



//                                 </div>
//                                 <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
//                                     <button
//                                         type="submit"
//                                         className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                     >
//                                         Save
//                                     </button>

//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//                 {/* Ngày Chiếu */}
//                 <div className="hidden sm:block" aria-hidden="true">
//                     <div className="py-5">
//                         <div className="border-t border-gray-200" />
//                     </div>
//                 </div>
//                 {/*  */}
//                 <div className="mt-10 sm:mt-0">
//                     <div className="md:grid md:grid-cols-3 md:gap-6">
//                         <div className="md:col-span-1">
//                             <div className="px-4 sm:px-0">
//                                 <h3 className="text-base font-semibold leading-6 text-gray-900">Personal Information</h3>
//                                 <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
//                             </div>
//                         </div>
//                         <div className="mt-5 md:col-span-2 md:mt-0">
//                             <div className="overflow-hidden shadow sm:rounded-md">
//                                 <div className="bg-white px-4 py-5 sm:p-6">
//                                     <div className="grid grid-cols-6 gap-6">
//                                         <div className="col-span-6 sm:col-span-3">
//                                             <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
//                                                 Đang chiếu
//                                             </label>
//                                             <br />
//                                             <Switch defaultChecked onChange={onChangeSwitch('dangChieu')} checked={formik.values.dangChieu}/>
//                                         </div>

//                                         <div className="col-span-6 sm:col-span-3">
//                                             <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
//                                                 Sắp chiếu
//                                             </label>
//                                             <br />
//                                             <Switch defaultChecked onChange={onChangeSwitch('sapChieu')} checked={formik.values.sapChieu}/>
//                                         </div>
//                                         <div className="col-span-6 sm:col-span-3">
//                                             <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
//                                                 Độ Hot
//                                             </label>
//                                             <br />
//                                             <Switch defaultChecked onChange={onChangeSwitch('hot')} checked={formik.values.hot}/>
//                                         </div>
//                                         <div className="col-span-6 sm:col-span-3">
//                                             <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
//                                                 Ngày chiếu
//                                             </label>
//                                             <br />
//                                             <DatePicker size={20} format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
//                                         </div>
//                                         <div className="col-span-6 sm:col-span-4">
//                                             <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
//                                                 Số Sao
//                                             </label>
//                                             <fieldset>
//                                                 <div className="mt-4 space-y-4">
//                                                     <div className="flex items-center">
//                                                         <input
//                                                             onChange={formik.handleChange}
//                                                             checked={formik.values.danhGia}
//                                                             id="push-everything"
//                                                             name="danhGia"
//                                                             value="1"
//                                                             type="radio"
//                                                             className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                                         />
//                                                         <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
//                                                             Một
//                                                         </label>
//                                                     </div>
//                                                     <div className="flex items-center">
//                                                         <input
//                                                             onChange={formik.handleChange}
//                                                             checked={formik.values.danhGia}
//                                                             id="push-email"
//                                                             name="danhGia"
//                                                             type="radio"
//                                                             value="2"
//                                                             className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                                         />
//                                                         <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
//                                                             Hai
//                                                         </label>
//                                                     </div>
//                                                     <div className="flex items-center">
//                                                         <input
//                                                             onChange={formik.handleChange}
//                                                             checked={formik.values.danhGia}
//                                                             id="push-nothing"
//                                                             name="danhGia"
//                                                             type="radio"
//                                                             value="3"
//                                                             className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                                         />
//                                                         <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
//                                                             Ba
//                                                         </label>
//                                                     </div>
//                                                     <div className="flex items-center">
//                                                         <input
//                                                             onChange={formik.handleChange}
//                                                             checked={formik.values.danhGia}
//                                                             id="push-nothing"
//                                                             name="danhGia"
//                                                             type="radio"
//                                                             value="4"
//                                                             className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                                         />
//                                                         <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
//                                                             Bốn
//                                                         </label>
//                                                     </div>
//                                                     <div className="flex items-center">
//                                                         <input
//                                                             onChange={formik.handleChange}
//                                                             checked={formik.values.danhGia}
//                                                             id="push-nothing"
//                                                             name="danhGia"
//                                                             type="radio"
//                                                             value="5"
//                                                             className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                                         />
//                                                         <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
//                                                             Năm
//                                                         </label>
//                                                     </div>
//                                                 </div>
//                                             </fieldset>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
//                                     <button
//                                         type="submit"
//                                         className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                     >
//                                         Save
//                                     </button>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }

