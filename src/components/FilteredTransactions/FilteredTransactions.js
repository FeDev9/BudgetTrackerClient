import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import classNames from 'classnames';
import { Field, Form, Formik } from 'formik';
import './FilteredTransactions.scss'

const FilteredTransactions = (props) => {

    const [filterTransactions, setFilterTransactions] = useState([]);



    const filter = (values) => {
        const fetchData = async () => {
            const results = await axios.put('http://localhost:3005/user/transactions/filter', {

                dateStart: values.dateStart,
                dateEnd: values.dateEnd,
                userId: props.userId

            })
            if (results.data.results.length === 0) {
                props.setMsg('Enter a valid dates');
                setFilterTransactions([]);
            } else {
                setFilterTransactions(results.data.results);
                props.setRender(!props.render);
            }

        }
        fetchData();

    }

    return (
        <>
            <h2 className="filter-title">Filter Section</h2>
            <div className="filter-form">
                <Formik
                    initialValues={{
                        dateStart: '',
                        dateEnd: ''
                    }}
                    onSubmit={values => filter(values)}>
                    <Form>
                        <h3>Filter your transactions</h3>
                        <div>
                            <label htmlFor="dateStart">Since:</label>
                            <Field type="date" name="dateStart" id="dateStart" />
                        </div>
                        <div>
                            <label htmlFor="dateEnd">Until:</label>
                            <Field type="date" name="dateEnd" id="dateEnd" />
                        </div>

                        <button type='submit'>Filter</button>

                    </Form>

                </Formik>
                <h4 className={classNames({ 'msg': props.msg })}>
                    {props.msg !== undefined ? props.msg : ''}
                </h4>
            </div>


            <div className="transaction">

                {
                    filterTransactions.map(transaction => transaction).reverse().map((transaction) => {
                        return (
                            <div key={transaction.id} className={classNames('single', { 'negative': transaction.value < 0 }, { 'positive': transaction.value > -1 })}>
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
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default FilteredTransactions