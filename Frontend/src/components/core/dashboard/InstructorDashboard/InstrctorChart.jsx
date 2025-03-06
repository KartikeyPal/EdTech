import React, { useState } from 'react'
import { Chart,registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);


const InstrctorChart = ({courses}) => {
  const [currentChart,setCurrentChart]  = useState("students"); 

  const rendomColour = (numsColours) =>{
    const colours = [];
    for(let i=0;i<numsColours;i++){
      const colour = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)} )`;
      colours.push(colour);
    }
    return colours;
  }

    //create data for chart displaying student info
        const chartDataForStudents = {
          labels: courses.map((course)=>course.courseName),
          datasets: [
            {
              data: courses.map((course)=>course.totalStudent),
              backgroundColor: rendomColour(courses.length),
            }
          ]
        }

    //create data for chart for displaying  income info
    const chartDataForIncome = {
      labels: courses.map((course)=>course.courseName),
      datasets: [
        {
          data: courses.map((course)=>course.totalAmountGenerated),
          backgroundColor: rendomColour(courses.length),
        }
      ]
    }

    //create options
    const options = {};


  return (
    <div>
        <div>
          <button onClick={()=>setCurrentChart("student")}>
            Student
          </button>
          <button onClick={()=>setCurrentChart("income")}>Income</button>
        </div>

        <div>
          <Pie 
            data={currentChart === "students" ? chartDataForStudents : chartDataForIncome}
          
          />
        </div>

    </div>
  )
}

export default InstrctorChart