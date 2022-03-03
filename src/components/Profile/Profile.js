import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import avatar from '../../public/img/avatar.png'
import { useEffect } from 'react';
import TransactionsTable from '../TransactionsTable/TransactionsTable';
import TransactionsInput from '../TransactionsInput/TransactionsInput';
import FilteredTransactions from '../FilteredTransactions/FilteredTransactions';
import './Profile.scss'


const Profile = (props) => {

    const [msg, setMsg] = useState(undefined);
    const [render, setRender] = useState(false);


    const [transactions, setTransactions] = useState([]);

    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const results = await axios.put('http://localhost:3005/user', {
                userId: props.userId
            });

            setIncome(results.data.income);
            setExpense(results.data.expense);
            setTransactions(results.data.transactions);
        }
        fetchData();
    }, [render])

    return (
        <>

            <div className="profile-cnt">
                <div className="profile-card">
                    <div className="avatar-cnt">
                        <img src={avatar} alt='avatar' className="avatar" />
                    </div>
                    <h5 className="card-title">
                        Hi, {props.name}!
                    </h5>
                    <p>In this page you can manage your budget and see the incomes and the expenses of the
                        current month.</p>
                    <a href='/' className='delete'>Logout</a>
                </div>
                <div className="profile-page">
                    <div className="profile-header">
                        <div className="bal-inc-exp">
                            <h3 className="title-cnt">This Month</h3>
                            <div className="bal">
                                <h4 className="title">Balance</h4>
                                <p className="value">
                                    {(income + expense).toFixed(2)}
                                </p>
                            </div>
                            <div className="inc">
                                <h4 className="title">Incomes</h4>
                                <p className="value">
                                    {income.toFixed(2)}
                                </p>
                            </div>
                            <div className="exp">
                                <h4 className="title">Expenses</h4>
                                <p className="value">
                                    {expense.toFixed(2)}
                                </p>
                            </div>

                        </div>
                        <TransactionsInput userId={props.userId}
                            setRender={setRender} render={render} />
                    </div>
                    <TransactionsTable setRender={setRender} render={render}
                        transactions={transactions} userId={props.userId} />
                </div>
            </div>

            <FilteredTransactions userId={props.userId} setRender={setRender} render={render} msg={msg} setMsg={setMsg} />


        </>
    )
}

export default Profile