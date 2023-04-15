import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { ACCESS_TOKEN, removeStore, USER_LOGIN } from '../../../../util/config'

import { Select } from 'antd';
//
import { useTranslation } from 'react-i18next';
import { Menu, Dropdown, Icon } from 'antd';

// header 

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const products = [
    { name: 'Mùa đông', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Mùa hè', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
]
const callsToAction = [
    { name: 'Mùa Xuân', href: '#', icon: PlayCircleIcon },
    { name: 'Mùa Thu', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                Thông tin cá nhân
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                Giỏ hàng
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/" onClick={() => {
                removeStore(ACCESS_TOKEN);
                removeStore(USER_LOGIN);
                //clear hết tất cả biến trên redux
                window.location.reload();//f5 reload lại trang
            }}>
                Đăng xuất
            </a>
        </Menu.Item>
    </Menu>
);
///



export default function () {
    // 
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    //
    const { t, i18n } = useTranslation();
    const { userLogin } = useSelector(state => state.QuanLyNguoiDung);
    const renderLoginButton = () => {
        if (userLogin) {
            if (window.innerWidth > 1023) {
                return <>
                    <NavLink to="/profile" className="nav-link mx-3 text-red header-name" style={{ color: 'red' }}>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link text-center justify-center" onClick={e => e.preventDefault()}>
                                {userLogin.hoTen}
                            </a>
                        </Dropdown>
                    </NavLink>
                    {/* 
                <button type="button" className="btn " onClick={() => {
                    removeStore(ACCESS_TOKEN);
                    removeStore(USER_LOGIN);
                    //clear hết tất cả biến trên redux
                    window.location.reload();//f5 reload lại trang
                }}>
                    Đăng Xuất
                </button> */}

                </>
            } else {
                return (
                    <div>
                        <div className="space-y-2 py-6">
                            <Disclosure as="div" className="-mx-3">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                                            {userLogin.hoTen}
                                            <ChevronDownIcon
                                                className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                aria-hidden="true"
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-2 space-y-2 m-auto">
                                            <Disclosure.Button
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                Thông tin cá nhân
                                            </Disclosure.Button>
                                        </Disclosure.Panel>
                                        <Disclosure.Panel className="mt-2 space-y-2">
                                            <Disclosure.Button
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                Giỏ hàng
                                            </Disclosure.Button>
                                        </Disclosure.Panel>
                                        <Disclosure.Panel className="mt-2 space-y-2">
                                            <Disclosure.Button
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"

                                                onClick={() => {
                                                    removeStore(ACCESS_TOKEN);
                                                    removeStore(USER_LOGIN);
                                                    //clear hết tất cả biến trên redux
                                                    window.location.reload();//f5 reload lại trang
                                                }}
                                            >
                                                Đăng xuất
                                            </Disclosure.Button>
                                        </Disclosure.Panel>
                                        {/* <p>445</p>
                                        <p>899</p> */}
                                    </>
                                )}
                            </Disclosure>

                            <a
                                href="#"
                                className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                Cụm Rạp
                            </a>
                            <a
                                href="#"
                                className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                Tin Tức
                            </a>
                            <a
                                href="#"
                                className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                Ứng Dụng
                            </a>
                        </div>
                    </div>
                )
            }
        } else {
            if (window.innerWidth > 1023) {
                return <div>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900 mb-4 " onClick={() => {
                        history.push('/login')
                    }}>
                        <svg style={{ width: '40px', height: '40px', display: 'inline-block' }} class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></svg>
                        <span style={{ color: "gray" }}>Đăng nhập</span>
                    </a>
                    
                      
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900 pl-5">
                        <svg style={{ width: '40px', height: '40px', display: 'inline-block', color: "green" }} class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></svg>
                        <span style={{ color: "gray" }}>Đăng ký</span>
                    </a>
                </div>
            } else {
                return (
                    <div>
                        <div className="space-y-2 py-6">
                            <a href="#" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => {
                                history.push('/login')
                            }}>
                                <span style={{ color: "gray" }}>Đăng nhập</span>
                            </a>
                            <a href="#" className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                <span style={{ color: "gray" }}>Đăng ký</span>
                            </a>
                            <a
                                href="#"
                                className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                Cụm Rạp
                            </a>
                            <a
                                href="#"
                                className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                Tin Tức
                            </a>
                            <a
                                href="#"
                                className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                Ứng Dụng
                            </a>
                        </div>
                    </div>
                )
            }
        }


    }
    // 
    const { Option } = Select;

    function handleChange(value) {
        i18n.changeLanguage(value)
    }
    return (
        <div>
            <header className="bg-white header">
                <nav className="mx-auto flex items-center justify-between" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8 w-auto" src="./img/headTixLogo.png" alt="" style={{ width: "80%", height: "80%" }} />
                        </a>
                    </div>
                    {/* img Titel */}

                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <Popover.Group className="hidden lg:flex lg:gap-x-12">
                        <Popover className="relative">
                            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                <NavLink to="/home">
                                    Lịch Chiếu
                                </NavLink>
                                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                    <div className="p-4">
                                        {products.map((item) => (
                                            <div
                                                key={item.name}
                                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                            >
                                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                                </div>
                                                <div className="flex-auto">
                                                    <a href={item.href} className="block font-semibold text-gray-900">
                                                        {item.name}
                                                        <span className="absolute inset-0" />
                                                    </a>
                                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                        {callsToAction.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                            >
                                                <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>

                        <NavLink to='/contact' className="text-sm font-semibold leading-6 text-gray-900">
                            Cụm Rạp
                        </NavLink>
                        <NavLink to="/news" className="text-sm font-semibold leading-6 text-gray-900">
                            Tin tức
                        </NavLink>
                        <NavLink to="/" className="text-sm font-semibold leading-6 text-gray-900">
                            Ứng Dụng
                        </NavLink>
                    </Popover.Group>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {renderLoginButton()}
                    </div>
                </nav>


                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-10" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                {renderLoginButton()}
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </div>
    )
}
