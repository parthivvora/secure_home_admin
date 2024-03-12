import React from 'react'
import './Styles/Navbar.css'

function Navbar() {
  return (
    <>
      <nav className='navbar-part d-flex align-items-center justify-content-end'>
        {/* <div className="searchbar-part">
          <input className="form-control me-2" type="text" placeholder="Search here..." name='search' />
          <span><i className="fa-solid fa-magnifying-glass"></i></span>
        </div> */}
        <div className="avatar-part d-flex align-items-center">
          <div className="profile-img">
            <img src={require("../Assets/avatar.png")} alt="avatar.png" />
          </div>
          <div className="naming-part">
            <h4 className='m-0'>Admin</h4>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar