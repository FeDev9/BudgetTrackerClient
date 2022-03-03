import React from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import './TransactionsInput.scss'

const TransactionsInput = (props) => {

    const addTransaction = (values) => {

        const fetchData = async () => {
            await axios.post('http://localhost:3005/user/transactions/add-transaction', {
                userId: props.userId,
                type: values.type,
                value: values.value
            })
            props.setRender(!props.render);

        }
        fetchData();


    }
    return (
        <div className="add-transaction">
            <h4 className="title">Add Transaction</h4>
            <Formik
                initialValues={{
                    type: '',
                    value: ''
                }}
                onSubmit={values => addTransaction(values)}>
                <Form>
                    <div className="input-box">
                        <label htmlFor="type">Type</label>
                        <Field className='field' type="text" id="type" name="type" />
                    </div>
                    <div className="input-box">
                        <label htmlFor="value">Expense/Income
                            <br />
                            <span>(- before for expenses)</span>
                        </label>
                        <Field className='field' type="number" id="value" name="value" step="0.01" />
                    </div>
                    <button type="submit">Add</button>

                </Form>
            </Formik>
        </div>
    )
}

export default TransactionsInput