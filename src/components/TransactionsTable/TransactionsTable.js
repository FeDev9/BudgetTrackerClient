import React from 'react';
import axios from 'axios';
import './TransactionsTable.scss'

const TransactionsTable = (props) => {


    const deleteTransaction = (id) => {

        const fetchData = async () => {
            await axios.delete(`http://localhost:3005/user/transactions/delete-transaction/${id}`, {
                data: {
                    id: id,
                    userId: props.userId
                },
                headers: { Authorization: "token" }
            })
            props.setRender(!props.render);
        }
        fetchData();

    }

    return (
        <div className="transaction">
            <h2 className="title">Last 10 transactions</h2>
            {
                props.transactions.map(transaction => transaction).reverse().slice(0, 10).map((transaction) => {
                    return (
                        <div key={transaction.id} className={transaction.value < 0 ? 'single negative' : 'single positive'}>
                            <div className="data">
                                <p>
                                    {transaction.type}
                                </p>
                                <p>
                                    {transaction.value} $
                                </p>
                                <p>
                                    {new Date(transaction.date).toLocaleDateString("en-US")}
                                </p>
                            </div>
                            <button onClick={() => deleteTransaction(transaction.id)}
                                className="delete">Delete</button>
                        </div>
                    )
                })}
        </div>
    )
}

export default TransactionsTable