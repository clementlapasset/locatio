import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


function DoughnutChart() {
  
  const [doughnutChartData, setDoughnutChartData] = useState([])

  useEffect( () => {
    //**********************on initialisation of component populate bar chart with data from database*********************/
  async function loadData() {
    var rawResponse = await fetch('/finance');
    var response = await rawResponse.json();

    var filteredResponse = response.filter(item => item.type==='cost' || item.type==='rent')

    let chartData = filteredResponse.map((item) => {
      return ({month: new Date(item.dateDebut).getMonth(), total: item.montant, chargeType: item.type, frequency: item.frequence})
  })

  console.log('chartData for doughnut is', chartData)

    //******************************reduce costs into an array of months with month totals*************************/
  var reducer = chartData.reduce((acc, item) => {
      let isExist = acc.find(({chargeType}) => item.chargeType === chargeType);
      if(isExist) {
        isExist.total += item.total;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    console.log('reducer for doughnut is', reducer)

    setDoughnutChartData(reducer)  
      //************************create array of data for rent based on data submitted from sign up*************************/
  var sumRent = 0;
          chartData.forEach((element) => {
              if (element.chargeType === 'rent') {
                sumRent += (element.total*element.frequency)
              }
          })
    
  } loadData()
    //****************************recharge componenet each time a new charge is added to update chart *****************************/
}, [])

const labels= doughnutChartData.map(item => item.chargeType)

var array = doughnutChartData.map(item => item.total)
const data = {
    labels,
    datasets: [
      {
        label: '# of Votes',
        data: array,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',

        ],
        borderWidth: 1,
      },
    ],
  };

return <Doughnut data={data} />

}

export default DoughnutChart;
