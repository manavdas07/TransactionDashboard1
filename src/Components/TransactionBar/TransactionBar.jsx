import React, { useState, useEffect } from 'react';
import './TransactionBar.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionBar = () => {
    const [chartData, setChartData] = useState({
        labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901 above'],
        datasets: [
            {
                label: 'Sales',
                data: [15, 25, 40, 20, 25, 15, 30, 70, 15, 35],
                backgroundColor: '#4DD0E1',
            }
        ]
    });

    useEffect(() => {
        fetchChartData(); // Fetch initial chart data when component mounts 
    }, []); // Empty dependency array means it runs once on mount

    const fetchChartData = async () => {
        try {
            const response = await fetch('http://localhost:5000/barchart');
            if (!response.ok) {
                throw new Error('Failed to fetch chart data');
            }
            const data = await response.json();
            setChartData({
                labels: data.labels,
                datasets: [
                    {
                        label: data.label,
                        data: data.data,
                        backgroundColor: data.backgroundColor,
                    }
                ]
            });
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    const options = {
        scales: {
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 45,
                }
            },
            y: {
                beginAtZero: true,
            }
        }
    };

    return (
        <div className='transactionbar-container'>
            <h1>Bar Chart Stats - June</h1>
            <div className="chart-wrapper">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}

export default TransactionBar;
