"use client"

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
const accountNames = accounts.map((a) => a.name);
const balances = accounts.map((a) => a.currentBalance)


  const data = {
    datasets: [
        {
            lable: 'Banks',
            data: balances,
            backgroundColor: ['#b82ff3ff', '#165fdcff', '#fa2facff']
        }
    ],
    labels: accountNames
  }

  return <Doughnut 
  className='hover:cursor-pointer
                transition-transform duration-200 ease-out
                hover:scale-[1.08]
                active:scale-[0.98];'
  data={data}
  options={{
    cutout: '60%',
    plugins:{
        legend:{
            display: false
        }
    }
  }} 
  />
}

export default DoughnutChart
