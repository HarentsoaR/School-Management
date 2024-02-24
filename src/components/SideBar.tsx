import { Link, useNavigate } from "react-router-dom"
import LogoutButton from "./LogoutButton"

const SideBar = () => {

    return (
        <>
            <aside className="flex flex-col w-full h-screen py-8 overflow-y-auto bg-gradient-to-t from-slate-800 to-indigo-950 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 rounded-sm">
                <a className="mx-auto mt-2 mb-4" >
                    <img className="w-auto h-20 rounded opacity-75" src="/iconWeb.png" alt="" />
                </a>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav className="mx-3 space-y-6 pe-4">
                        <div className="space-y-3 ">
                            <label className="px-3 ms-3 text-xs text-gray-500 uppercase dark:text-gray-200">analytics</label>

                            <div className="d-grid my-3">
                                <Link className=" button_nav" to={"/dashboard"} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeidth="1.5" stroke="currentColor" className="button_navI">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                                    </svg>

                                    <span className="mx-3 my-1 text-sm font-medium">Dashboard</span>
                                </Link>

                            </div>
                        </div>

                        <div className="space-y-3 ">
                            <label className="px-3 ms-3 text-xs text-gray-500 uppercase dark:text-gray-400">content</label>
                            <div className="d-grid my-3">
                                <Link className="button_nav" to={"/teacher"} >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0  0  24  24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="button_navI feather feather-user">
                                        <path d="M20  21v-2a4  4  0  0  0-4-4H8a4  4  0  0  0-4  4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>


                                    <span className="mx-3 my-1 text-sm font-medium">Teachers</span>
                                </Link>
                            </div>

                            <div className="d-grid my-3 ">
                                <Link className="button_nav" to={"/room"} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="button_navI">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                    </svg>

                                    <span className="mx-3 my-1 text-sm font-medium">Classrooms</span>
                                </Link>
                            </div>

                            <div className="d-grid my-3 ">
                                <Link className="button_nav" to={"/reservations"} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="button_navI">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>

                                    <span className="mx-3 my-1 text-sm font-medium">Reservations</span>
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-3 ">
                            <label className="px-3 ms-3 text-xs text-gray-500 uppercase dark:text-gray-400">Customization</label>

                            <div className="d-grid my-3 ">
                                <LogoutButton/>
                            </div>
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default SideBar
