import React, { useState } from 'react'
import './Styles/Sidebar.css'
import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
  const [logout, setLogout] = useState("")
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const changePageRouting = (routingName) => {
    if (routingName === "logout") {
      setLogout(routingName)
      sessionStorage.removeItem("adminToken")
      window.location.href = "/"
    }
    else {
      setLogout("")
      navigate(routingName)
    }
  }
  return (
    <>
      <section className='sidebar-section'>
        <div className="logo-body text-center">
          <a href="/dashboard">
            <img src={require("../Assets/site-logo.png")} alt="" />
          </a>
        </div>
        <div className="menus-items mt-5">
          <ul className='list-unstyled m-0 '>
            <li className={(pathname === '/dashboard' && logout === "") ? "select-color" : ""} onClick={() => changePageRouting('/dashboard')}><span>Dashboard</span></li>
            <li className={(pathname === '/users' && logout === "") ? "select-color" : ""} onClick={() => changePageRouting('/users')}><span>Users</span></li>
            <li className={(pathname === "/staff" && logout === "") ? "select-color" : ""} onClick={() => changePageRouting('/staff')}><span>Staffs</span></li>
            <li className={(pathname === "/visitors" && logout === "") ? "select-color" : ""} onClick={() => changePageRouting('/visitors')}><span>Visitors</span></li>
            <li className={logout === "logout" ? "select-color" : ""} onClick={() => changePageRouting('logout')}><span>Logout</span></li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Sidebar