import React, { useState, useEffect } from 'react';
import './Transactiontable.css';

const Transactiontable = () => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchTransactions();
    }, [page]); // Fetch transactions when page changes

    const fetchTransactions = async () => {
        try {
            const response = await fetch(`http://localhost:5000/transactions?page=${page}&perPage=10`);
            if (!response.ok) {
                throw new Error('Failed to fetch transactions');
            }
            const data = await response.json();
            setTransactions(data.transactions);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handlePreviousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1)); // Ensure page doesn't go below 1
    };

    const handleNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPages)); // Ensure page doesn't exceed totalPages
    };

    return (
        <div className='transaction-table'>
            <div className='transaction-head'>
                <p>Transaction Dashboard</p>
                <div className="transactiontable-search">
                    <input type="text" placeholder='Search' />
                    <select>
                        <option value="January"> January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Sold</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.title}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.price}</td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.sold}</td>
                                    <td><img src={transaction.image} alt={transaction.title} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <p>Page No: {page}</p>
                    <div className="buttons">
                        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
                    </div>
                    <p>Per Page: 10</p>
                </div>
            </div>
        </div>
    );
}

export default Transactiontable;
