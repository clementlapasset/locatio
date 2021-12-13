import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Button } from 'reactstrap';

ChartJS.register(ArcElement, Tooltip, Legend);


function DoughnutChart() {
  
  const [doughnutChartData, setDoughnutChartData] = useState([])
  const [doughnutChartDataMonth, setDoughnutChartDataMonth] = useState([])
  const [monthBtn, setMonthBtn] = useState(false)

  var currentMonth = new Date().getMonth()

  useEffect( () => {
    //**********************on initialisation of component populate bar chart with data from database*********************/
  async function loadData() {
    var rawResponse = await fetch('/finance');
    var response = await rawResponse.json();

    var filteredResponse = response.filter(item => item.type==='cost' || item.type==='rent')

    let chartData = filteredResponse.map((item) => {
      return ({month: new Date(item.dateDebut).getMonth(), total: item.montant, chargeType: item.type, frequency: item.frequence})
  })

  if (monthBtn) {
        var sumCosts = 0;
                doughnutChartData.forEach((element) => {
                    if (new Date(element.dateDebut).getMonth()===currentMonth){
                        if (element.type === 'cost') {
                            sumCosts += element.montant
                            return sumCosts
                        }
                    }
                })
        setDoughnutChartData([{chargeType: 'cost', total: sumCosts }])
  }else{
    var reducer = chartData.reduce((acc, item) => {
        let isExist = acc.find(({chargeType}) => item.chargeType === chargeType);
        if(isExist) {
          isExist.total += item.total;
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
  
      setDoughnutChartData(reducer)  
  } 
  } loadData()

}, [monthBtn])

console.log('doughnut chart data is after click', doughnutChartData)

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

return (
<>
<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
<Button onClick={() => setMonthBtn(true)}>Month</Button>{' '}<Button onClick={() => setMonthBtn(false)}>YTD</Button>
</div>
<Doughnut
options={{ responsive: true, maintainAspectRatio: false }}
data={data} />
</>
)


}

export default DoughnutChart;
