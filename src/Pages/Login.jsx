import React, { useState } from 'react'
import '../Styles/Login.css'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import db from '../Global/firebase'

function Login() {
    const [adminData, setAdminData] = useState({ password: "", email: "" })

    const adminLoginData = (event) => {
        setAdminData({ ...adminData, [event.target.name]: event.target.value })
    }
    const submitLoginInfo = async (e) => {
        e.preventDefault()
        // const ref = db.app.database().ref("user")
        // ref.on("value", (snapshot) => {
        //     const data = snapshot.val()
        //     console.log("🚀 ~ ref.on ~ data:", data)
        // })

        await db.app.auth().signInWithEmailAndPassword(adminData.email, adminData.password)
            .then((response) => {
                toast.success("Successfully login", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1700,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "light",
                    transition: Bounce,
                })
                sessionStorage.setItem("adminToken", response.user.za)
                setTimeout(() => {
                    window.location.href = "/dashboard"
                }, 1800);
            })
            .catch((error) => {
                toast.error("Invalid email or password", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1700,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "light",
                    transition: Bounce,
                })
            })
    }
    return (
        <>
            <ToastContainer />
            <section className='login-page'>
                <div className="site-logo text-center mb-5">
                    <img src={require("../Assets/site-logo.png")} alt="site-logo.png" style={{ width: "180px" }} />
                </div>
                <div className="login-form-body">
                    <form method="post" onSubmit={submitLoginInfo}>
                        <div className="header-part">
                            <div className="title-part text-center mt-4">
                                <h2 className='m-0'>Login Your Account</h2>
                            </div>
                        </div>
                        <div className="body-part">
                            <div className="phone-part d-flex">
                                <span className='icon-bg'><i className="fa-solid fa-phone phone-icon"></i></span>
                                <input type="email" placeholder='Enter Email' name='email' onChange={adminLoginData} />
                            </div>
                            <div className="password-part d-flex mt-3">
                                <span className='icon-bg'><i className="fa-solid fa-lock password-icon"></i></span>
                                <input type="password" placeholder='Enter Password' name='password' onChange={adminLoginData} />
                            </div>
                        </div>
                        <div className="footer-part mt-4 text-center ">
                            <button type='submit'>Login</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login