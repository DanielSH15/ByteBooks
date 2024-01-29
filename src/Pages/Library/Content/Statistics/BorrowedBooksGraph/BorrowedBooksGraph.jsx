import React, {useState, useEffect} from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import './BorrowedBooksGraph.css'

const BorrowedBooksGraph = () => {
    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    
    const [dataPoints, setDataPoints] = useState([])

    const options = {
        animationEnabled: true,
        theme: "dark2",
        title: {
            text: "Borrowed books"
        },
        axisY: {
        title: "Number of books",
            scaleBreaks: {
                autoCalculate: true,
                type: "wavy",
                lineColor: "white"
            }
        },
        data: [{
            type: "column",
            indexLabel: "{y}",		
            indexLabelFontColor: "white",
            dataPoints: dataPoints
        }]
    }

    const GetDataPoints = async() => {
        try{
            await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/book/getborrowstats')
            .then((response) => {
                setDataPoints(response.data)
                console.log(response.data)
            })
        } catch (e) {
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        GetDataPoints()
    }, [])

    
    return(
        <div className="graph-container">
            <CanvasJSChart options = {options} 
			/>
        </div>
    )
}

export default BorrowedBooksGraph