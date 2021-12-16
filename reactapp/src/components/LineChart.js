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

  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {

    async function loadData() {
      var rawResponse = await fetch(`/finance/${props.token}`);
      var response = await rawResponse.json();

      var filteredResponse = response.filter(item => item.type === 'fixedCost' || item.type === 'variableCost' || item.type === 'rent')

      let chartData = filteredResponse.map((item) => {
        return ({ month: new Date(item.dateDebut).getMonth(), total: item.montant, type: item.type, frequency: item.frequence, description: item.description })
      })
      /*************************************************CALCULATE ANNUAL RENT**************************************************** */
      var rent = chartData.find(element => element.type === 'rent')

      var monthlyRevenue = labels.map(() => {
        var montlyRent = rent.total
        return montlyRent
      })

      setLineChartRent(monthlyRevenue)
      /*************************************************CALCULATE ANNUAL FIXED & VARIABLE COSTS**************************************************** */
      var reducer = chartData.reduce((acc, item) => {
        let isExist = acc.find(({ month }) => item.month === month);
        if (item.type === 'variableCost') {
          if (isExist) {
            isExist.total += item.total;
          } else {
            acc.push(item);
          }
        }
        return acc;
      }, []);

      var totalFixedCost = 0

      var fixedCosts = chartData.filter(element => element.type === 'fixedCost')

      fixedCosts.forEach(e => {
        totalFixedCost += e.total
      })

      var newArray = labels.map((label = 0, i) => {

        var monthExists = reducer.find(month => i === month.month)

        if (monthExists) {
          return label = monthExists.total + totalFixedCost
        } else {
          return label = totalFixedCost
        }
      })

      setLineChartCosts(newArray)

    } loadData()

  }, [props.update])

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
    scales: {
      y: {
        beginAtZero: true
      }
    }
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
      <Line options={options} data={data} />
    </>
  )

}

function mapStateToProps(state) {
  return { update: state.update, token: state.token }
}

export default connect(
  mapStateToProps,
  null
)(LineChart);

