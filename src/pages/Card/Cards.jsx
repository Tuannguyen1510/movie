import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ReactDOM from 'react-dom'
import ModalVideo from 'react-modal-video'
import { YoutubeOutlined, PlayCircleOutlined } from '@ant-design/icons';
////

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone, PlayCircleTwoTone } from '@ant-design/icons';

const { Meta } = Card;



export default function Cards(props) {
    const { item } = props;
    const [isOpen, setOpen] = useState(false);

    const url = item.trailer;
    // console.log(url.split("/").pop());
    const id = url.split("/").pop();
    // console.log(id);

    return (
        <>
            {/* <Card
                style={{ width: 300, marginTop: '20px' }}
                cover={
                    <img
                        alt="example"
                        src={item.hinhAnh}
                        style={{
                            width: "100%",
                            height: "250px",
                            objectFit: 'cover'
                        }}
                    />
                }
                actions={[
                    <HeartTwoTone twoToneColor="#eb2f96" />,
                    <React.Fragment>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={id} onClose={() => setOpen(false)} />
                        <button className="btn-primary" onClick={() => setOpen(true)}><YoutubeOutlined /></button>
                    </React.Fragment>
                ]}
            >
                <Meta
                    // avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                    title={item.tenPhim}
                description={<NavLink to={`/detail/${item.maPhim}`} type="button" className="" id="hoverButton" style={{
                    width:"100%",
                    color:'black',
                    border: "1px solid green",
                    textAlign :"center",
                    padding:'10px',
                    fontSize: '15px'
                    
                }}>Đặt vé</NavLink>}
                />
            </Card> */}



            <NavLink to={`/detail/${item.maPhim}`} type="button" className="" id="hoverButton" >
                <div className="card">
                    <div className="card-img" style={{
                        backgroundImage: `url(${item.hinhAnh})`, // Sử dụng template literals để truyền dữ liệu vào backgroundImage
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}>
                        <div className="card-video">
                            <React.Fragment>
                                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={id} onClose={() => setOpen(false)} />
                                <button className="btn-primary" onClick={() => setOpen(true)}><PlayCircleOutlined style={{ width: "100px", height: "100px" }} /></button>
                            </React.Fragment>
                        </div>
                    </div>

                    {/*  */}
                    <div class="content">
                        <div className="card-content">
                            <div className="d-flex content">
                                <span> </span>
                                <span>{item.tenPhim}</span>
                            </div>
                        </div>
                        <div className="card-moTa">
                            <p>{item.moTa.slice(0, 50)}....</p>
                            <div className="card-datVe">
                                <button>Múa Vé</button>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                </div>
            </NavLink>

        </>


    )
}
