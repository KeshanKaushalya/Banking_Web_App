import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import { redirect } from 'next/navigation';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import BankCard from '@/components/BankCard';


const MyBanks = async () => {

    const loggedIn = await getLoggedInUser();
  
    if (!loggedIn) {
      redirect('/sign-in');
    }
  
    const accounts = await getAccounts({
      userId: loggedIn.$id
    });

  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox 
          title='My Bank Accounts'
          subtext='Manage your linked bank accounts securely.'
        />

        <div className='space-y-4'>
          <h2 className='header-2'>Your Bank Cards</h2>
          <div className='flex flex-wrap gap-6'>
            {accounts && accounts.data.map((a: Account) => 
            (
              <BankCard 
                key={a.id}
                account={a}
                userName={loggedIn.firstName || 'User'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks
