import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import '../Styles/Dashboard.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../Global/firebase'
import 'firebase/database';

function Security() {
    const [staffData, setStaffData] = useState([]);
    const [updatestaffData, setUpdateStaffData] = useState({ name: "", contact: "", gender: "", joinDate: "", isDeleted: false });
    const [currentPage, setCurrentPage] = useState(1);
    const [staffId, setStaffId] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const modalRef = useRef(null);

    // Get all user information
    async function getAllSocietyInformation() {
        const db = firebase.app.database().ref("staff").once("value")
        const fetchData = (await db).val()
        if (fetchData) {
            setLoading(true)
            setStaffData(Object.values(fetchData))
        }
    }

    // Pagination
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(staffData.length / itemsPerPage);
    const data = staffData.slice(startIndex, endIndex)

    const changePageIndex = (event, pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const getUpdateSocietyInfo = (event) => {
        setUpdateStaffData({ ...updatestaffData, [event.target.name]: event.target.value })
    }

    // Update society information (Update)
    const postSecurityInfo = async (e) => {
        e.preventDefault()

        const newRef = firebase.app.database().ref("staff").push()
        if (!staffId) {
            const uniqueId = newRef.key;

            const newObj = {
                name: updatestaffData.name,
                contact: updatestaffData.contact,
                gender: updatestaffData.gender,
                joinDate: updatestaffData.joinDate,
                isDeleted: false,
                id: uniqueId
            }

            await newRef.set(newObj)
                .then((response) => {
                    toast.success("Staff information add successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                        pauseOnHover: false
                    });
                    modalRef.current.click()
                    getAllSocietyInformation()
                })
                .catch((error) => {
                    console.log("🚀 ~ postSecurityInfo ~ error:", error)
                    toast.error("Error occur", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                        pauseOnHover: false
                    });
                })
        }
        else {
            const newObj = {
                name: updatestaffData.name,
                contact: updatestaffData.contact,
                gender: updatestaffData.gender,
                joinDate: updatestaffData.joinDate,
                isDeleted: status == "true" ? true : false,
            }

            await firebase.app.database().ref(`staff/${staffId}`).update(newObj)
                .then((response) => {
                    toast.success("Staff information edit successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                        pauseOnHover: false
                    });
                    modalRef.current.click()
                    getAllSocietyInformation()
                })
                .catch((error) => {
                    console.log("🚀 ~ postSecurityInfo ~ error:", error)
                    toast.error("Error occur", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                        pauseOnHover: false
                    });
                })
        }
    }

    const editData = (item) => {
        setUpdateStaffData(item)
        setStaffId(item.id)
        setStatus(item.isDeleted)
    }

    useEffect(() => {
        getAllSocietyInformation()
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
                                <h1 className='m-0'>Staff</h1>
                                <button data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add New</button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered mt-5 ">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Staff Name</th>
                                            <th>Staff Contact</th>
                                            <th>Gender</th>
                                            <th>Join Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((item, index) => (
                                                <tr key={index}>
                                                    <td> {item.id} </td>
                                                    <td> {item.name} </td>
                                                    <td> {item.contact} </td>
                                                    <td> {item.gender} </td>
                                                    <td> {item.joinDate} </td>
                                                    <td> {item.isDeleted.toString() == "true" ? <span className="badge bg-success">Inactive</span> : <span className="badge bg-warning text-dark">Active</span>} </td>
                                                    <td> <FaEdit style={{ cursor: "pointer", fontSize: "18px" }} onClick={() => editData(item)} data-bs-toggle="modal" data-bs-target="#exampleModal1" /> </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            {/* Add Model */}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Add New Staff</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef}></button>
                                        </div>
                                        <div className="modal-body">
                                            <form method='post' onSubmit={postSecurityInfo}>
                                                <div className="mb-3">
                                                    <label htmlFor="userName" className="col-form-label">Staff Name :</label>
                                                    <input type="text" className="form-control" name='name' value={updatestaffData.name || ""} onChange={getUpdateSocietyInfo} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password" className="col-form-label">Staff Phone :</label>
                                                    <input type="tel" pattern="[0-9]{10}" className="form-control" name='contact' value={updatestaffData.contact || ""} onChange={getUpdateSocietyInfo} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="contact" className="col-form-label">Staff Gender :</label>
                                                    <div className='d-flex align-items-center gap-4'>
                                                        <div className="form-check mb-0">
                                                            <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="male" onChange={getUpdateSocietyInfo} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">Male</label>
                                                        </div>
                                                        <div className="form-check mb-0">
                                                            <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="female" onChange={getUpdateSocietyInfo} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">Female</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="societyName" className="col-form-label">Staff Join Date :</label>
                                                    <input className="form-control w-50" type="date" name="joinDate" id="flexRadioDefault1" onChange={getUpdateSocietyInfo} />
                                                </div>
                                                <div className="modal-footer" style={{ border: "none" }}>
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-primary">Add Staff</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Edit Model */}
                            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Edit Staff Details</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef}></button>
                                        </div>
                                        <div className="modal-body">
                                            <form method='post' onSubmit={postSecurityInfo}>
                                                <div className="mb-3">
                                                    <label htmlFor="userName" className="col-form-label">Staff Name :</label>
                                                    <input type="text" className="form-control" name='name' value={updatestaffData.name || ""} onChange={getUpdateSocietyInfo} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password" className="col-form-label">Staff Phone :</label>
                                                    <input type="tel" pattern="[0-9]{10}" className="form-control" name='contact' value={updatestaffData.contact || ""} onChange={getUpdateSocietyInfo} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="contact" className="col-form-label">Staff Gender :</label>
                                                    <div className='d-flex align-items-center gap-4'>
                                                        <div className="form-check mb-0">
                                                            <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="male" onChange={getUpdateSocietyInfo} checked={updatestaffData.gender == "male" ? true : false} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">Male</label>
                                                        </div>
                                                        <div className="form-check mb-0">
                                                            <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="female" onChange={getUpdateSocietyInfo} checked={updatestaffData.gender == "female" ? true : false} />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">Female</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="societyName" className="col-form-label">Staff Join Date :</label>
                                                    <input className="form-control w-50" type="date" name="joinDate" id="flexRadioDefault1" value={updatestaffData.joinDate} onChange={getUpdateSocietyInfo} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="societyName" className="col-form-label">Select Status :</label>
                                                    <select className="form-select w-50" aria-label="Default select example" name="isDeleted" onChange={(e) => setStatus(e.target.value)}>
                                                        <option selected disabled>Select status</option>
                                                        <option disabled={status.toString() == "true" ? true : false} value={true}>True</option>
                                                        <option disabled={status.toString() == "false" ? true : false} value={false}>False</option>
                                                    </select>
                                                </div>
                                                <div className="modal-footer" style={{ border: "none" }}>
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-primary">Edit Staff</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
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

export default Security