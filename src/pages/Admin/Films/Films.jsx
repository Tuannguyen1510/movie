import React, { useEffect } from 'react'
import { Table } from 'antd';
import { AudioOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPhimApi, getAllPhimApiAction } from '../../../redux/reducers/QuanLyPhimReducer';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';

export default function Films() {

  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    const actionThunk = getAllPhimApi();
    dispatch(actionThunk);
  }, []);
  console.log(arrFilm);



  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
  const onSearch = (value) => console.log(value);
  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      sorter: (a, b) => a.maPhim - b.maPhim,
      width: '10%',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      render: (text, film) => {
        return <>
          <img src={film.hinhAnh} alt={film.hinhAnh} width={100} height={100} onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "https://cdn.thuvienphapluat.vn/uploads/tintuc/2023/01/03/xem-phim-tai-rap.jpeg";
          }} />
        </>
      },
      width: '10%',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },

      width: '10%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      // sorter: (a, b) => {
      //    let tenPhimA = a.tenPhim.toLowerCase().trim();
      //    let tenPhimB = b.tenPhim.toLowerCase().trim();
      //    if(tenPhimA > tenPhimB){
      //     return 1 ;
      //    }
      //    return -1;
      // },
      render: (text, films) => {
        return (
          <>
            {films.moTa.length > 100 ? films.moTa.substr(0, 100) + '...' : films.moTa}
          </>
        )
      },
      sortDirections: ['descend', 'ascend'],
      width: '10%',
    },
    {
      title: 'Hành động',
      dataIndex: 'hanhDong',
      // sorter: (a, b) => {
      //    let tenPhimA = a.tenPhim.toLowerCase().trim();
      //    let tenPhimB = b.tenPhim.toLowerCase().trim();
      //    if(tenPhimA > tenPhimB){
      //     return 1 ;
      //    }
      //    return -1;
      // },
      render: (text, films) => {
        return (
          <div >
            <NavLink to={`/admin/films/edit/${films.maPhim}`}><EditOutlined style={{color: 'green', fontSize: '20px'}}/>  </NavLink>
            <NavLink to=""> <DeleteOutlined style={{color: 'red', fontSize: '20px'}}/> </NavLink>

          </div>
        )
      },
      sortDirections: ['descend', 'ascend'],
      width: '10%',
    }
  ];
  const data = arrFilm;
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };





  return (
    <>
      <h3 className='text-center' style={{
        fontSize: '30px',
        color: "red"
      }}>Quản lý Phim</h3>
      <button className='btn btn-success my-3' onClick={() => {
        history.push('/admin/films/addnew');
      }}>Thêm Phim</button>\
   
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        suffix={suffix}
        onSearch={onSearch}
      />
   <br />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  )
}
