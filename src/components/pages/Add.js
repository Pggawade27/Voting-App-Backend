import React, { useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import axios from 'axios'

const Add = () => {

    const [inputChange, setInputChange] = useState({
        username: "",
        number: "",
        task: ""
    })

    const changeHandler = (e) => {
        setInputChange({
            ...inputChange,
            [e.target.name]: e.target.value
        });
    }

    const addUser = async () => {
        const URL = "http://localhost:5000";

        try {
            await axios.post(`${URL}/add`, inputChange);
            console.log("Request sent successfully");
        } catch (error) {
            console.error("Error sending request:", error);
        }
    }

    console.log(inputChange)
    return (
        <Row>
            <Col sm='12' className='d-flex justify-content-center align-items-center'>
                <div>
                    <div>
                        <label>Username</label>
                        <input className='form-control w-100 mt-2' type='text' name='username'
                            onChange={(e) => changeHandler(e)}
                        />
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input className='form-control w-100 mt-2' type='number' name='number'
                            onChange={(e) => changeHandler(e)}
                        />
                    </div>
                    <div>
                        <label>Task</label>
                        <input className='form-control w-100 mt-2' type='text' name='task'
                            onChange={(e) => changeHandler(e)}
                        />
                    </div>
                    <div className='mt-4 text-center '>
                        <Button color='dark' outline onClick={() => addUser()}>Submit</Button>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Add