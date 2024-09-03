import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BankContext from '../context/BankContext'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Deposit = () => {
    const { deposit, profileData } = useContext(BankContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: profileData._id,
        name: profileData.name,
        accountType: profileData.accountType,
        amount: '',
        method: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'amount') {
            setFormData({ ...formData, [name]: Number(value) })
        }
        else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const { userId, name, accountType, amount, method, password } = formData

    const submitHandler = async (e) => {
        e.preventDefault();
        const result = await deposit(userId, name, accountType, amount, method, password)
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
                userId: profileData._id,
                name: profileData.name,
                accountType: profileData.accountType,
                amount: '',
                method: '',
                password: ''
            })
            navigate('/profile')
        }
    }
    return (
        <>
            <div className="signup my-5">
                <div className="container py-5">
                    <h1>Deposit</h1>
                    <p>Make Deposit Easier In ApnaBank</p>
                    <form onSubmit={submitHandler}>
                        <div className="first my-3">
                            <input
                                name='userId'
                                value={formData.userId}
                                onChange={handleChange}
                                type="text"
                                placeholder='User ID'
                                readOnly
                                required />

                            <input
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                placeholder='Full Name'
                                required 
                                readOnly/>
                        </div>
                        <div className="second my-3">
                            <input
                                name='amount'
                                value={formData.amount}
                                onChange={handleChange}
                                type="number"
                                placeholder='Amount'
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
                                required
                                >
                                <option value="" disabled>Account Type</option>
                                <option value="saving">Saving</option>
                                <option value="current">Current</option>
                            </select>
                            <select
                                name='method'
                                value={formData.method}
                                onChange={handleChange}
                                required>
                                <option value="" disabled>Method</option>
                                <option value="cash_deposit">Cash Deposit</option>
                                <option value="atm_deposit">ATM Deposit</option>
                                <option value="cheque_deposit">Cheque Deposit</option>
                                <option value="online_banking">Online Banking</option>
                            </select>
                        </div>
                        <div className='my-4'>
                            <button className='btn'>Deposit</button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Deposit