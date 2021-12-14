import React, {useState, useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

var currentMonth = new Date().getMonth()

function LineChart(props) {

    const [lineChartRent, setLineChartRent] = useState([])
    const [lineChartCosts, setLineChartCosts] = useState([])
    
    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    useEffect( () => {

      async function loadData() {
        var rawResponse = await fetch('/finance');
        var response = await rawResponse.json();
        
        var filteredResponse = response.filter(item => item.type==='cost' || item.type==='rent')
        console.log('filtered list for linechart', filteredResponse)
  
        let chartData = filteredResponse.map((item) => {
          return ({month: new Date(item.dateDebut).getMonth(), total: item.montant, type: item.type, frequency: item.frequence, description: item.description})
      })

      console.log('linechart chart data', chartData)
  
      var rent = chartData.find(element => element.type === 'rent')

      let accumulatedRent = 0

      var accumulatedRentTable = labels.map(() =>{
        var montlyRent = rent.total
        return accumulatedRent += montlyRent
      } )

      setLineChartRent(accumulatedRentTable)

      var credit = chartData.find(element => element.description === 'credit repayment')
      var annexCosts = chartData.find(element => element.description === 'annex costs')

      var creditYear = credit.total
      var annexYear = annexCosts.total

      var totalFixedCostsMonthly = (creditYear+annexYear)

      var extraMonthlyCostsArray = labels.map((label = 0, i) => {
  
      var months = chartData.find(item => i === item.month)
      if (months) {
        if (months.type === 'cost'&& months.description!=='credit repayment' || months.type === 'cost'&& months.description!=='annex costs'){
          return label = months.total
        }else {
        return label = 0
        }
        }
     })

     console.log(extraMonthlyCostsArray)
     var accumulatedCostTable = extraMonthlyCostsArray.map(month => month + totalFixedCostsMonthly)

      setLineChartCosts(accumulatedCostTable)

      } loadData()

    }, [props.depenses])

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      
     console.log('line chart rent', lineChartRent)
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: lineChartRent,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: lineChartCosts,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };


  return <Line options={options} data={data} />;
}

function mapStateToProps(state) {
  return { depenses: state.depenses }
}

export default connect(
  mapStateToProps,
  null
)(LineChart);

