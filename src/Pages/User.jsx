import React, { useEffect, useState } from 'react'
import firebase from '../Global/firebase'
import 'firebase/database';
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function User() {
    const [loading, setLoading] = useState(false);
    const [securityData, setSecurityData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Get all user information
    async function getAllSocietyInformation() {
        const db = firebase.app.database().ref("user").once("value")
        const fetchData = (await db).val()
        if (fetchData) {
            setSecurityData(Object.values(fetchData))
            setLoading(true)
        }
    }

    // Pagination
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(securityData.length / itemsPerPage);
    const data = securityData.slice(startIndex, endIndex)
    const changePageIndex = (event, pageIndex) => {
        setCurrentPage(pageIndex)
    }

    useEffect(() => {
        getAllSocietyInformation()
    }, [])
   
    if(loading){
        return (
            <div className="security-part">
                <Navbar />
                <Sidebar />
                <div className="security-content">
                    <div className="content-container">
                        <div className="header-part">
                            <h1 className='m-0'>Users</h1>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered mt-5">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Contact</th>
                                        <th>Building No</th>
                                        <th>Flat No</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => (
                                            <tr key={index}>
                                                <td> {item.id} </td>
                                                <td> {item.name} </td>
                                                <td> {item.contact} </td>
                                                <td> {item.buildingNo} </td>
                                                <td> {item.flatNo} </td>
                                                <td> {item.email} </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Stack spacing={2} className='mt-5'>
                            <Pagination count={totalPages} size="large" onChange={changePageIndex} />
                        </Stack>
                    </div>
                </div>
            </div>
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

export default User
