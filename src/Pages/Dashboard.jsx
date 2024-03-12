import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import '../Styles/Dashboard.css'
import firebase from '../Global/firebase'
import 'firebase/database';

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [totalDataCount, setTotalDataCount] = useState({ userCount: "", visitorCount: "", staffCount: "" });
  const [usersData, setUsersData] = useState();

  // Get all information into Dashboard
  async function getAllInformationDashboard() {
    const userDb = firebase.app.database().ref("user").once("value")
    const visitoDb = firebase.app.database().ref("visitor").once("value")
    const staffDb = firebase.app.database().ref("staff").once("value")

    const fetchUserData = (await userDb).val()
    const fetchVisitorData = (await visitoDb).val()
    const fetchStaffData = (await staffDb).val()
    if (fetchUserData && fetchVisitorData && fetchStaffData) {
      // setTotalUserCount(Object.values(fetchData).length)
      setTotalDataCount({ userCount: Object.values(fetchUserData).length, visitorCount: Object.values(fetchVisitorData).length, staffCount: Object.values(fetchStaffData).length })
      setLoading(true)
    }
  }

  useEffect(() => {
    getAllInformationDashboard()
  }, [])

  if (loading) {
    return (
      <>
        <section className='dashboard-part'>
          <Navbar />
          <Sidebar />
          <div className="dashboard-content">
            <div className="content-container">
              <h1>Dashboard</h1>
              <div className="content-card mt-5">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="card-box">
                      <div className="icon-box">
                        <img src={require("../Assets/users-group.png")} alt="users-group" className='img-fluid ' />
                      </div>
                      <div className="icon-content">
                        <h4>Total Users</h4>
                        <h3 style={{ fontWeight: 600, margin: 0 }}> {totalDataCount.userCount} </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="card-box">
                      <div className="icon-box">
                        <img src={require("../Assets/watchman.png")} alt="users-group" className='img-fluid ' />
                      </div>
                      <div className="icon-content">
                        <h4>Total Staff</h4>
                        <h3 style={{ fontWeight: 600, margin: 0 }}> {totalDataCount.staffCount} </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="card-box">
                      <div className="icon-box">
                        <img src={require("../Assets/users.png")} alt="users-group" className='img-fluid ' />
                      </div>
                      <div className="icon-content">
                        <h4>Total Visitors</h4>
                        <h3 style={{ fontWeight: 600, margin: 0 }}> {totalDataCount.visitorCount} </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
  else {
    return (
      <div class="page-loader">
        <div class="spinner"></div>
        <div class="txt">LOADING...</div>
      </div>
    )
  }
}

export default Dashboard