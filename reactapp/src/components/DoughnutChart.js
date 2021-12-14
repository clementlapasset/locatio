import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Button } from 'reactstrap';

ChartJS.register(ArcElement, Tooltip, Legend);


function DoughnutChart() {

    const [doughnutChartData, setDoughnutChartData] = useState([])
    const [monthBtnActive, setMonthBtnActive] = useState(false)

    var currentMonth = new Date().getMonth()

    useEffect(() => {

        async function loadData() {

            var rawResponse = await fetch('/finance');
            var response = await rawResponse.json();

            var filteredResponse = response.filter(item => item.type === 'cost' || item.type === 'rent')

            let chartData = filteredResponse.map((item) => {
                return ({ month: new Date(item.dateDebut).getMonth(), total: item.montant, type: item.type, frequency: item.frequence, description: item.description })
            })

            var rent = chartData.find(element => element.type === 'rent')
            var credit = chartData.find(element => element.description === 'credit repayment')
            var annexCosts = chartData.find(element => element.description === 'annex costs')
            
            if (monthBtnActive) {

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
            } else {
                var rentYTD = rent.total * (currentMonth + 1)
                var creditYTD = credit.total * (currentMonth + 1)
                var annexYTD = annexCosts.total * (currentMonth + 1)

                var costsYTD = 0;
                chartData.forEach((element) => {
                        if (element.type === 'cost'&& element.description!=='credit repayment' || element.type === 'cost'&& element.description!=='annex costs') {
                            costsYTD += element.total
                            return costsYTD
                        }
                })

                var TotalCostsYTD = creditYTD + costsYTD + annexYTD

                setDoughnutChartData([{ type: 'cost', total: TotalCostsYTD }, {type: 'rent', total: rentYTD}])
            }
        } loadData()

    }, [monthBtnActive])

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
                <Button onClick={() => setMonthBtnActive(true)}>Month</Button>{' '}<Button onClick={() => setMonthBtnActive(false)}>YTD</Button>
            </div>
            <Doughnut
                options={{ responsive: true, maintainAspectRatio: false}}
                data={data} />
        </>
    )


}

export default DoughnutChart;
