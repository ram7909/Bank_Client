import React, { useContext, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import BankContext from '../context/BankContext'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const {login} = useContext(BankContext)
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
        let result = await login(email, password)
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
            navigate('/')
        }

    }

    return (
        <>
            <div className="signup my-5">
                <div className="container py-5">
                    <h1>Login</h1>
                    <p>Welcome back! Please log in to access your account.</p>
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
                        <Link to={'/forgot/password'}><u>Forgot Password</u></Link>
                        <div className='my-4'>
                            <button className='btn'>Login</button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Login