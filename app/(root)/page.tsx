import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className='home'>
      <div className='home-content'>
          <header className='home-header'>
            <HeaderBox 
              type="greeting"
              title="Welcome"
              user={loggedIn?.name || 'Guest'}
              subtext=" Wealthix transforms everyday transactions into intelligent money management experiences ."
            />

            <TotalBalanceBox 
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={1250.35}
            />
          </header>
       
       RECENT TRANSACTIONS
      </div>

     <RightSidebar
     user={loggedIn}
     transactions={[]}
     banks={[{ currentBalance: 120.50 }, { currentBalance: 500.50 }]}
     />
    </section>
  )
}

export default Home
