import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import BankContext from '../context/BankContext'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Forgot = () => {
    const { forgotPassword } = useContext(BankContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const { email, password } = formData

    const submitHandler = async (e) => {
        e.preventDefault();
        let result = await forgotPassword(email, password)
        toast.success(result.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        if (result.success) {
            setFormData({
                email: '',
                password: ''
            })
            navigate('/login')
        }

    }

    return (
        <>
            <div className="signup my-5">
                <div className="container py-5">
                    <h1>Change Password</h1>
                    <p>Enter Your Email and New Password</p>
                    <form onSubmit={submitHandler}>
                        <div className="first my-3">
                            <input
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                placeholder='Email Address'
                                required />

                            <input
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                placeholder='Password'
                                required />
                        </div>
                        <div className='my-4'>
                            <button className='btn'>Change Password</button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Forgot