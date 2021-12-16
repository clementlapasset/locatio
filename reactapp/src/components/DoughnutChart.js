import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux'

ChartJS.register(ArcElement, Tooltip, Legend);


function DoughnutChart(props) {

    const [doughnutChartData, setDoughnutChartData] = useState([])

    var currentMonth = new Date().getMonth()


    useEffect(() => {

        async function loadData() {

            var rawResponse = await fetch(`/finance/${props.token}`);
            var response = await rawResponse.json();

            var filteredResponse = response.filter(item => item.type === 'fixedCost' || item.type === 'variableCost' || item.type === 'rent')

            let chartData = filteredResponse.map((item) => {
                return ({ month: new Date(item.dateDebut).getMonth(), total: item.montant, type: item.type, frequency: item.frequence, description: item.description })
            })

            var rent = chartData.find(element => element.type === 'rent')

            var costsMonth = 0;
            chartData.forEach((element) => {
                if (element.month === currentMonth) {
                    if (element.type === 'fixedCost' || element.type === 'variableCost') {
                        costsMonth += element.total
                        return costsMonth
                    }
                }

            })

            setDoughnutChartData([{ total: costsMonth }, { type: 'rent', total: rent.total }])

        } loadData()

    }, [props.update])

    const labels = ["Dépenses", "Loyer"]

    var dataDonut = doughnutChartData.map(item => item.total)

    const data = {
        labels,
        datasets: [
            {
                label: '# of Votes',
                data: dataDonut,
                backgroundColor: [
                    'rgba(254, 100, 90, 1)',
                    'rgba(0, 198, 137, 1)',

                ],
                borderColor: [
                    'rgba(255, 176, 57, 1)',
                    'rgba(42, 50, 125, 1)',


                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Doughnut
                options={{ responsive: true, maintainAspectRatio: false }}
                data={data} />
        </>
    )


}

function mapStateToProps(state) {
    return { update: state.update, token: state.token }
}

export default connect(
    mapStateToProps,
    null
)(DoughnutChart);
