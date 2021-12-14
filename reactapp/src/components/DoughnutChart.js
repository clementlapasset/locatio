import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'

ChartJS.register(ArcElement, Tooltip, Legend);


function DoughnutChart(props) {

    const [doughnutChartData, setDoughnutChartData] = useState([])

    var currentMonth = new Date().getMonth()

    useEffect(() => {

        async function loadData() {

            var rawResponse = await fetch(`/finance/${props.token}`);
            var response = await rawResponse.json();

            var filteredResponse = response.filter(item => item.type === 'cost' || item.type === 'rent')

            let chartData = filteredResponse.map((item) => {
                return ({ month: new Date(item.dateDebut).getMonth(), total: item.montant, type: item.type, frequency: item.frequence, description: item.description })
            })

            var rent = chartData.find(element => element.type === 'rent')
 
                var costsMonth = 0;
                chartData.forEach((element) => {
                    if (element.month === currentMonth) {
                        if (element.type === 'cost') {
                            costsMonth += element.total
                            return costsMonth
                        }
                    }
        
                })

                setDoughnutChartData([{ type: 'cost', total: costsMonth }, {type: 'rent', total: rent.total}])

        } loadData()

    }, [])

    const labels = doughnutChartData.map(item => item.type)

    var dataDonut = doughnutChartData.map(item => item.total)

    const data = {
        labels,
        datasets: [
            {
                label: '# of Votes',
                data: dataDonut,
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button>Month</Button>
            </div>
            <Doughnut
                options={{ responsive: true, maintainAspectRatio: false}}
                data={data} />
        </>
    )


}

function mapStateToProps(state) {
    return { costs: state.costs, token: state.token }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(DoughnutChart);
