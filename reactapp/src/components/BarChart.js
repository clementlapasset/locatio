import React, {useEffect} from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
} from "chart.js";
import { Chart } from "react-chartjs-2";
import faker from "faker";
import { connect } from 'react-redux'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


export const data = {
  labels,
  datasets: [
    {
      type: "line",
      label: "Provision Locataire",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 }))
    },
    {
      type: "bar",
      label: "Charges Reels",
      backgroundColor: "rgb(75, 192, 192)",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "white",
      borderWidth: 2
    },
  ]
};



function BarChart(props) {

  useEffect(async() => {
    async function loadData() {
      var rawResponse = await fetch('/finance/charges');
      var response = await rawResponse.json();

      let chartData = response.map((item) => {
        return ({month: new Date(item.dateDebut).getMonth(), total: item.montant})
    })


    var reducer = chartData.reduce((acc, item) => {
        let isExist = acc.find(({month}) => item.month === month);
        if(isExist) {
          isExist.total += item.total;
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
 
      console.log(reducer)
      
    } loadData()
  }, [])


      return <Chart type="bar" data={data} />;
    }

    function mapStateToProps(state) {
      return { charges: state.charges }
    }

    export default connect(
      mapStateToProps,
      null
    )(BarChart);