import React, { useEffect, useState } from 'react'
import BankContext from './BankContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BankState = (props) => {
    const url = "https://bank-api-ctt2.onrender.com"
    const [token, setToken] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [profileData, setProfileData] = useState({})
    const [reload, setReload] = useState(false)
    const [forgot, setForgot] = useState([])
    const [userStatement, setUserStatement] = useState([])
    const userId = profileData._id


    // Sign Up
    const signUp = async (name, email, phone, PAN, aadhar, accountType, password) => {
        let api = await axios.post(`${url}/user/signup`, {
            name, email, phone, PAN, aadhar, accountType, password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return api.data
    }


    // Login
    const login = async (email, password) => {
        let api = await axios.post(`${url}/user/signin`, {
            email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (api.data.token) {
            localStorage.setItem("token", api.data.token)
            setIsAuthenticated(true)
            setToken(api.data.token)
        }
        return api.data
    }

    // Profile
    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem("token")
        if (tokenFromLocalStorage) {
            setToken(tokenFromLocalStorage)
            setIsAuthenticated(true)
            setReload(true)
        }
        const profile = async () => {
            const api = await axios.get(`${url}/user/profile`, {
                headers: {
                    "Content-Type": "application/json",
                    auth: token
                }
            });
            setProfileData(api.data)
            setReload(!reload)
        }
        profile();
    }, [token, reload])


    // Deposit
    const deposit = async (userId, name, accountType, amount, method, password) => {
        if (!token) {
            console.log("Token Not Found");
        }
        let api = await axios.post(`${url}/transaction/deposit`, {
            userId, name, accountType, amount, method, password
        }, {
            headers: {
                "Content-Type": "application/json",
                auth: token
            }
        })
        setReload(!reload)
        return api.data
    }

    // Withdraw
    const withdraw = async (userId, name, accountType, amount, method, password) => {
        if (!token) {
            console.log("Token Not Found");
        }
        let api = await axios.post(`${url}/transaction/withdraw`, {
            userId, name, accountType, amount, method, password
        }, {
            headers: {
                "Content-Type": "application/json",
                auth: token
            }
        })
        setReload(!reload)
        return api.data
    }


    // User Statement
    const statement = async (id) => {
        const tokenlocal = localStorage.getItem('token')
        if (tokenlocal) {
            setIsAuthenticated(true)
            setToken(tokenlocal)
        }
        const api = await axios.get(`${url}/transaction/statement/get/${id}`, {
            headers: {
                "Content-Type": "application/json",
                auth: token
            }
        });
        setReload(!reload)
        setUserStatement(api.data.transactions
        )
    }

    useEffect(() => {
        if (userId) {
            statement(userId)
        }
    }, [reload, token, userId])



    // Forgot Password
    const forgotPassword = async (email, password) => {
        let api = await axios.put(`${url}/user/updatepassword`, {
            email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        setForgot(api.data)
        return api.data
    }


    return (
        <BankContext.Provider value={{ forgotPassword,userStatement, url, signUp, login, isAuthenticated, setToken, setIsAuthenticated, profileData, deposit, withdraw }}>
            {props.children}
        </BankContext.Provider>
    )
}

export default BankState