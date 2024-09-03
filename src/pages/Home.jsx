import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import BankContext from '../context/BankContext'

const Home = () => {
  const { isAuthenticated } = useContext(BankContext)
  return (
    <>
      <div className='home'>
        <div className="container">
          <div className="first">
            <h1>Welcome to ApnaBank Empowering Your <span>Financial Journey</span></h1>
            <p>At ApnaBank, our mission is to provide comprehensive banking solutions that empower individuals and businesses to achieve their financial goals. We are committed to delivering personalized and innovative services that prioritize our customers' needs.</p>
            {isAuthenticated ? (
              <>
                <Link to={'/profile'} className='btn'>See Account</Link>
              </>
            ) : (
              <>
                <Link to={'/createaccount'} className='btn'>Open Account</Link>
              </>
            )}
          </div>
          <div className="second"></div>
        </div>
      </div>
      <div className="product">
        <div className="container">
          <h1 className='text-center'>Our <span>Product</span></h1>
          <div className="accounts text-center">
            <div className="checking">
              <i className="fa-solid fa-briefcase"></i>
              <h5>Checking Accounts</h5>
              <p>Enjoy easy and convenient access to your funds with our range of checking account options. Benefit from features such as online and mobile banking, debit cards, and free ATM access.</p>
            </div>
            <div className="saving">
              <i className="fa-solid fa-file-invoice-dollar"></i>
              <h5>Savings Account</h5>
              <p>Build your savings with our competitive interest rates and flexible savings account options. Whether you're saving for a specific goal or want to grow your wealth over time, we have the right account for you.</p>
            </div>
            <div className="loan">
              <i className="fa-solid fa-landmark"></i>
              <h5>Loan and Mortages</h5>
              <p>Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need.</p>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default Home