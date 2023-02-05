import React from 'react'
import {NavLink} from 'react-router-dom'
export default function Card(props) {
    const { item } = props;
    return (
        <div className="rounded overflow-hidden">
            <img className="w-full" src={item.hinhAnh} alt="Sunset in the mountains" style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover'
            }} />
            <div className="px-6 pt-2">
                <div className="font-bold text-xl mb-2">{item.tenPhim}</div>
            </div>
            {/* <div class="pt-6">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Mô tả</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Ngày chiếu</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">trailer</span>
            </div> */}

            <NavLink to={`/detail/${item.maPhim}`} type="button" className="px-8 py-3 font-semibold rounded-full dark:bg-green-100 dark:text-green-800">Đặt vé</NavLink>

        </div>

    )
}
