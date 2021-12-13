import React, {useEffect, useState} from "react";
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


function BarChart(props) {

  // state variables to store data for charges and provisions
  const [barChartData, setBarChartDate] = useState([])
  const [lineChartData, setLineChartData] = useState([])

  useEffect( () => {
      //**********************on initialisation of component populate bar chart with data from database*********************/
    async function loadData() {
      var rawResponse = await fetch('/finance');
      var response = await rawResponse.json();
      
      var filteredResponse = response.filter(item => item.type==='charge' || item.type==='provision')
      console.log('filtered list for barchart', filteredResponse)

      let chartData = filteredResponse.map((item) => {
        return ({month: new Date(item.dateDebut).getMonth(), total: item.montant, chargeType: item.type, frequency: item.frequence})
    })

      //******************************reduce charges into an array of months with month totals*************************/
    var reducer = chartData.reduce((acc, item) => {
        let isExist = acc.find(({month}) => item.month === month);
        if(isExist) {
          isExist.total += item.total;
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
 
    setBarChartDate(reducer)  
        //************************create array of data for provisions based on data submitted from sign up*************************/
    var sumProvisions = 0;
            chartData.forEach((element) => {
                if (element.chargeType === 'provision') {
                    sumProvisions += (element.total*element.frequency)
                }
            })
    
    var lineChartMonthly = labels.map(() => sumProvisions/labels.length)
    setLineChartData(lineChartMonthly)
      
    } loadData()
      //****************************recharge componenet each time a new charge is added to update chart *****************************/
  }, [props.charges])



const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var newArray = labels.map((label = 0, i) => {
  
      //****************************create a data table of 12 elements to match the number of months*****************************/
  var monthExists = barChartData.find(month => i === month.month)

  if (monthExists) {
    return label = monthExists.total
  }else {
    return label = 0
  }
  
})

const data = {
  labels,
  datasets: [
    {
      type: "line",
      label: "Provision Locataire",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: lineChartData
    },
    {
      type: "bar",
      label: "Charges Reels",
      backgroundColor: "rgb(75, 192, 192)",
      data: newArray,
      borderColor: "white",
      borderWidth: 2
    },
  ]
};

      return <Chart type="bar" data={data} />;
    }

    function mapStateToProps(state) {
      return { charges: state.charges }
    }

    export default connect(
      mapStateToProps,
      null
    )(BarChart);