import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import firebase from '../Global/firebase'
import 'firebase/database';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../Styles/Dashboard.css'

function Visitors() {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    async function getAllVisitors() {
        const db = firebase.app.database().ref("visitor").once("value")
        const fetchData = (await db).val()
        if (fetchData) {
            setLoading(true)
            setVisitors(Object.values(fetchData))
        }
    }

    // Pagination
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(visitors.length / itemsPerPage);
    const data = visitors.slice(startIndex, endIndex)

    const changePageIndex = (event, pageIndex) => {
        setCurrentPage(pageIndex)
    }

    useEffect(() => {
        getAllVisitors()
    }, [])

    if (loading) {
        return (
            <>
                <div className="security-part">
                    <ToastContainer />
                    <Navbar />
                    <Sidebar />
                    <div className="security-content">
                        <div className="content-container">
                            <div className="header-part">
                                <h1 className='m-0'>Visitors</h1>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered mt-5 ">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Contact</th>
                                            <th>Building No</th>
                                            <th>Flat No</th>
                                            <th>Visit Date</th>
                                            <th>In Time</th>
                                            <th>Out Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((item, index) => (
                                                <tr key={index}>
                                                    <td> <img src={item.image} alt={item.image} className='w-50' /> </td>
                                                    <td> {item.name} </td>
                                                    <td> {item.mobile} </td>
                                                    <td> {item.buildingName} </td>
                                                    <td> {item.flatNo} </td>
                                                    <td> {item.entryDate} </td>
                                                    <td> {item.inTime} </td>
                                                    <td> {item.outTime} </td>
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
            </>
        )
    }
    else {
        return (
            <div className="page-loader">
                <div className="spinner"></div>
                <div className="txt">LOADING...</div>
            </div>
        )
    }
}

export default Visitors
