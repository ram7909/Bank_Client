import React, { useContext, useState } from 'react'
import BankContext from '../context/BankContext'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
    const { signUp } = useContext(BankContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        PAN: '',
        aadhar: '',
        password: '',
        accountType: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const { name, email, phone, PAN, aadhar, accountType, password } = formData

    const submitHandler = async (e) => {
        e.preventDefault();
        let result = await signUp(name, email, phone, PAN, aadhar, accountType, password)
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
                name: '',
                email: '',
                phone: '',
                PAN: '',
                aadhar: '',
                password: '',
                accountType: ''
            })
            navigate('/login')
        }

    }



    return (
        <>
            <div className="signup my-5">
                <div className="container py-5">
                    <h1>Create Account</h1>
                    <p>Join our community today! Create an account to unlock exclusive features and personalized experiences.</p>
                    <form onSubmit={submitHandler}>
                        <div className="first my-3">
                            <input
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                placeholder='Full Name'
                                required />

                            <input
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                placeholder='Email Address'
                                required />
                        </div>
                        <div className="second my-3">
                            <input
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                type="number"
                                placeholder='Phone Number'
                                required />

                            <input
                                name='PAN'
                                value={formData.PAN}
                                onChange={handleChange}
                                type="text"
                                placeholder='PAN Number'

                                required />
                        </div>
                        <div className="third my-3">
                            <input
                                name='aadhar'
                                value={formData.aadhar}
                                onChange={handleChange}
                                type="number"
                                placeholder='Aadhar Number'
                                required />

                            <input
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                placeholder='Password'
                                required />
                        </div>
                        <div className="four my-3">
                            <select
                                name='accountType'
                                value={formData.accountType}
                                onChange={handleChange}
                                required>
                                <option value="" disabled>Account Type</option>
                                <option value="saving">Saving</option>
                                <option value="current">Current</option>
                            </select>
                        </div>
                        <div className='my-4'>
                            <button className='btn'>Create Account</button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Signup