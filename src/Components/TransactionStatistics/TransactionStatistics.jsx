import React, { useState, useEffect } from 'react';
import './TransactionStatistics.css';

const TransactionStatistics = () => {
    const [statistics, setStatistics] = useState({
        totalSale: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
    });

    useEffect(() => {
        fetchStatistics(); // Fetch initial statistics when component mounts
    }, []); // Empty dependency array means it runs once on mount

    const fetchStatistics = async () => {
        try {
            const response = await fetch('http://localhost:5000/statistics');
            if (!response.ok) {
                throw new Error('Failed to fetch statistics');
            }
            const data = await response.json();
            setStatistics({
                totalSale: data.totalSales,
                totalSoldItems: data.totalSoldItems,
                totalNotSoldItems: data.totalNotSoldItems,
            });
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    return (
        <div className='statistics-container'>
            <h1>Statistics - June</h1>
            <div className="transactionstats-box">
                <div className="transactionstats-item">
                    <span>Total Sale</span>
                    <span>{statistics.totalSale}</span>
                </div>
                <div className="transactionstats-item">
                    <span>Total Sold Item</span>
                    <span>{statistics.totalSoldItems}</span>
                </div>
                <div className="transactionstats-item">
                    <span>Total Not Sold Item</span>
                    <span>{statistics.totalNotSoldItems}</span>
                </div>
            </div>
        </div>
    );
}

export default TransactionStatistics;
