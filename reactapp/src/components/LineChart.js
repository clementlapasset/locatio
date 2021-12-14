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
  const [lineChartFixedCosts, setLineChartFixedCosts] = useState([])
  const [totalCosts, setTotalCosts] = useState([])

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
      var credit = chartData.find(element => element.description === 'MensualitéCrédit')
      var annexCosts = chartData.find(element => element.description === 'CoûtAnnexe')

      var creditYear = credit.total
      var annexYear = annexCosts.total

      var totalFixedCostsMonthly = (creditYear + annexYear)

      let accumulatedFixedCosts = 0

      var accumulatedFixedCostTable = labels.map(() => accumulatedFixedCosts += totalFixedCostsMonthly)

      setLineChartFixedCosts(accumulatedFixedCostTable)

      /*************************************************CALCULATE ANNUAL TOTAL COSTS**************************************************** */

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
      setTotalCosts(newArray)

    } loadData()

  }, [props.costs])

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

  var showProjection = () => {

  }

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
        data: lineChartFixedCosts,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>
        <Button onClick={() => showActual()}>Projection</Button><Button onClick={() => showActual()}>Actual</Button>
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

