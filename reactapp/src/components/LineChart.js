import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
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
  const [showActual, setShowActual] = useState(false)


  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {

    async function loadData() {
      var rawResponse = await fetch(`/finance/${props.token}`);
      var response = await rawResponse.json();

      var filteredResponse = response.filter(item => item.type === 'cost' || item.type === 'rent')

      let chartData = filteredResponse.map((item) => {
        return ({ month: new Date(item.dateDebut).getMonth(), total: item.montant, type: item.type, frequency: item.frequence, description: item.description })
      })
      /*************************************************CALCULATE ANNUAL RENT**************************************************** */
      var rent = chartData.find(element => element.type === 'rent')

      let accumulatedRent = 0

      var accumulatedRentTable = labels.map(() => {
        var montlyRent = rent.total
        return accumulatedRent += montlyRent
      })

      setLineChartRent(accumulatedRentTable)
      /*************************************************CALCULATE ANNUAL FIXED COSTS**************************************************** */
      
      if(showActual) {
        var filteredTableByCosts = chartData.filter(item => item.type === 'cost')

        var reducer = filteredTableByCosts.reduce((acc, item) => {
          let isExist = acc.find(({ month }) => item.month === month);
          if (isExist) {
            isExist.total += item.total;
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
  
        var newArray = labels.map((label = 0, i) => {
  
          var monthExists = reducer.find(month => i === month.month)
  
          if (monthExists) {
            return label = monthExists.total
          } else {
            return label = 0
          }
  
        })
        setLineChartCosts(newArray)
      }else{
        var credit = chartData.find(element => element.description === 'MensualitéCrédit')
        var annexCosts = chartData.find(element => element.description === 'CoûtAnnexe')
  
        var creditYear = credit.total
        var annexYear = annexCosts.total
  
        var totalFixedCostsMonthly = (creditYear + annexYear)
  
        let accumulatedFixedCosts = 0
  
        var accumulatedFixedCostTable = labels.map(() => accumulatedFixedCosts += totalFixedCostsMonthly)
  
        setLineChartCosts(accumulatedFixedCostTable)
      }
    } loadData()

  }, [props.costs,showActual])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Loyer',
        data: lineChartRent,
        borderColor: 'rgb(0, 198, 137)',
        backgroundColor: 'rgba(0, 198, 137, 1)',
      },
      {
        label: 'Dépenses',
        data: lineChartCosts,
        borderColor: 'rgb(254, 100, 90)',
        backgroundColor: 'rgba(254, 100, 90, 1)',
      },
    ],
  };


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>
        Projection
      </div>
      <Line options={options} data={data} />
    </>
  )

}

function mapStateToProps(state) {
  return { costs: state.costs, token: state.token }
}

export default connect(
  mapStateToProps,
  null
)(LineChart);

