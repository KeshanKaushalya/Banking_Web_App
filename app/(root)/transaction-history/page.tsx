import HeaderBox from '@/components/HeaderBox'
import React from 'react'

const TransactionHistory = () => {
  return (
    <div className='transactions'>
      <div className='transactions-header'>
        <HeaderBox 
          title='Transaction History'
          subtext='View your past Wealthix transactions.'
        />
      </div>

      <div className='space-y-6'>
        <div className='transactions-account'></div>
      </div>
    </div>
  )
}

export default TransactionHistory
