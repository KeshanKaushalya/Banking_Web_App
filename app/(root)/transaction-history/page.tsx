import HeaderBox from '@/components/HeaderBox'
import React from 'react'

const TransactionHistory = () => {
  return (
    <div className='transactions'>
      <div className='transactions-header'>
        <HeaderBox 
          title='Transaction History'
          subtext='View your past transactions and manage your account activity.'
        />
      </div>
    </div>
  )
}

export default TransactionHistory
