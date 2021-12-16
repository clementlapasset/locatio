import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux'

ChartJS.register(ArcElement, Tooltip, Legend);


function DoughnutChart(props) {

    const [doughnutChartData, setDoughnutChartData] = useState([])
    const [cashFlow, setCashFlow] = useState(10)

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
            setCashFlow(rent.total - costsMonth)
            setDoughnutChartData([{ total: costsMonth }, { type: 'rent', total: rent.total }])
    
        } loadData()

    }, [props.update])

    useEffect(() => console.log('Evolution cashflow : ',cashFlow), [cashFlow])

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

    const plugins = [{
        afterDraw: function (chart) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 160).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            var text = '',
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]


    return (
        <>
            <Doughnut
                options={{ responsive: true, maintainAspectRatio: false }}
                data={data}
                plugins={plugins}
            />
            <div style={{position:'absolute', left:'47%', top:'52%', textAlign:'center', fontWeight:'bold'}}>
                Total<br></br>
                {cashFlow}€
            </div>
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
