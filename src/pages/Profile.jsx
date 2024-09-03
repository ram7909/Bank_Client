import React, { useContext, useEffect } from 'react'
import BankContext from '../context/BankContext'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
const Profile = () => {
  const { profileData, userStatement } = useContext(BankContext)

  const sortedTransactions = [...userStatement].sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));

  const last10Transactions = sortedTransactions.slice(0, 10);


  const generatePDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(18);
    doc.text('Profile Data', 10, 10)
    doc.setFontSize(12)
    doc.text(`User ID: ${profileData._id}`, 10, 20)
    doc.text(`Account Holder Name: ${profileData.name}`, 10, 30)
    doc.text(`Account Number: ${profileData.accountNumber}`, 10, 40)
    doc.text(`Account Balance: ${profileData.balance}`, 10, 50)
    doc.text(`Account Type: ${profileData.accountType}`, 10, 60)


    doc.text('', 10, 70);

    // Add all transactions
    doc.setFontSize(18);
    doc.text('All Transactions', 10, 80);
    doc.setFontSize(12);

    
    const columns = [
      { header: 'Transaction ID', dataKey: 'transactionId' },
      { header: 'Method', dataKey: 'method' },
      { header: 'Amount', dataKey: 'amount' },
      { header: 'Type', dataKey: 'type' },
      { header: 'Balance', dataKey: 'balance' },
      { header: 'Date', dataKey: 'date' },
      { header: 'Time', dataKey: 'time' }
    ];

    const data = sortedTransactions.map(transaction => ({
      transactionId: transaction.transactionId,
      method: transaction.method,
      amount: transaction.amount,
      type: transaction.type,
      balance: transaction.balance,
      date: new Date(transaction.transactionDate).toLocaleDateString(),
      time: new Date(transaction.transactionDate).toLocaleTimeString()
    }));

    autoTable(doc, {
      columns: columns,
      body: data,
      startY: 90,
      margin: { left: 10, right: 10 },
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 10 }
    });

    // Save the PDF
    doc.save('statement.pdf');

  }


  return (
    <>
      <div className="profile">
        <div className="contain my-4">
          <div className="name_logo">
            <i className='fa-solid fa-gem'></i>
            <h1>ApnaBank</h1>
          </div>
          <div className="account_detail">
            <div className="main">
              <h6>User ID : <span>{profileData._id}</span></h6>
              <h6>Account Holder Name : <span>{profileData.name}</span></h6>
              <h6>Account Number : <span>{profileData.accountNumber}</span></h6>
              <h6>Account Balance : <span>{profileData.balance}</span></h6>
              <h6>Account Type : <span>{profileData.accountType}</span></h6>
            </div>
            <button className='btn my-2' onClick={generatePDF}><i className="fa-solid fa-file-arrow-down mx-1"></i> Statement</button>
          </div>
        </div>
        <div className="container">
          {last10Transactions.map((e) => <div key={e.transactionId}>
            <div className="box my-2">
              <p><span className='key'>Transaction ID :</span> <span>{e.transactionId}</span> </p>
              <p><span className='key'>Method : </span><span>{e.method}</span></p>
              <p><span className='key'>Amount :</span> <span>{e.amount}</span></p>
              <p><span className='key'>Type :</span> <span>{e.type}</span></p>
              <p><span className='key'>Balance :</span> <span>{e.balance}</span></p>
              <p><span className='key'>Date : </span><span>{new Date(e.transactionDate).toLocaleDateString()}</span></p>
              <p><span className='key'>Time :</span> <span> {new Date(e.transactionDate).toLocaleTimeString()}</span></p>
            </div>
          </div>)}
        </div>
        <div className="container text-center my-4 note">* Here are your last ten transactions. If you need the complete transaction history, you can download it by clicking the 'Download Statement' button above. *</div>
      </div>
    </>
  )
}

export default Profile