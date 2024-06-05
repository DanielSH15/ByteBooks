import React, { useContext, useEffect, useState } from "react";
import './ReadingTest.css'
import { useLocation, useNavigate } from "react-router-dom";
import StopWatch from "./StopWatch/StopWatch";
import Explanation from "../../../../components/Modals/ReadingTestExplanation/Explanation";
import axios from "axios";
import {FaInfo} from 'react-icons/fa'
import { Context } from "../../../../components/Contexts/AuthContext/AuthContext";

const ReadingTest = () => {
    const[explanationModalOpen, setExplanationModalOpen] = useState(true)
    const[isRunning, setIsRunning] = useState(false)
    const[time, setTime] = useState(0)
    const location = useLocation()
    const {refreshToken} = useContext(Context)
    const navigate = useNavigate()

    var insert = {
        userId: JSON.parse(localStorage.getItem("userId")),
        milliseconds: time
    }
    
    const SetBorrowTime = async() => {
        try{
            await axios.post(import.meta.env.VITE_BACKEND_URI + '/api/user/setborrowtime', insert)
            .then((response) => {
                console.log(response.data)
                localStorage.setItem("borrowTime", response.data)
                refreshToken()
            })
            navigate('/library')
        } catch (e){
            console.log(e.response.data)
        }
    }

    return(
        <div className="reading-test-content-container">
            <FaInfo className="explanation-info" onClick={() => setExplanationModalOpen(true)}/>
            <div>
                <div className="image-container" style={{display: isRunning ? 'block' : 'none'}}></div>
                <StopWatch isRunning={isRunning} setIsRunning={setIsRunning} time={time} setTime = {setTime} setBorrowTime={SetBorrowTime}/>
            </div>
            <Explanation show={explanationModalOpen} onHide={() => setExplanationModalOpen(false)} />
        </div>
    )
}

export default ReadingTest