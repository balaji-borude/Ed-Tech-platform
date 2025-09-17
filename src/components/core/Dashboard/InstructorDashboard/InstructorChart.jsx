import React, { useState } from 'react'
import { Chart,registerables } from 'chart.js';
import { Pie } from "react-chartjs-2";

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// register chart elements
Chart.register(...registerables);
// ChartJS.register(ArcElement, Tooltip, Legend);





const InstructorChart = ({courses}) => {

  // onClick event sathi state cha use kela ahe onClick wr update krt ahe 

  const[currChart, setCurrChart ] = useState("students");

  // function to generate the random color 
  const getRandomColors = (numColors)=>{ 
    const colors =[];
    for(let i=0; i<numColors; i++){
      // color created 
      const color = `rgb(${Math.floor(Math.random()*256)}, 
                         ${Math.floor(Math.random()*256)},
                         ${Math.random(Math.random()*256)}
                        )`;

      // console.log("Printing rgb colors ==>", color);

     colors.push(color); // colors ya array mahe create kele la color push kela ahe 

    }
    return colors;
  };

  // create data for chart displaying student info 
  const chartDataForStudents ={
    labels:courses.map((course)=> course.courseName),
    datasets:[
      {
        data:courses.map((course)=>course.totalStudentEnrolled),
              // courses chya length chya barorab chya colors mla de 
              // functionc all kel ahe 
        backgroundColor:getRandomColors(courses.length),

      }

    ]

  }

  // create data for chart ==> displaying Income Info 
  const chartDataForIncomes ={
     labels:courses.map((course)=> course.courseName),
     datasets:[
      {
        data:courses.map((course)=>course.totalAmountGenerated),
              // courses chya length chya barorab chya colors mla de 
              // functionc all kel ahe 
        backgroundColor:getRandomColors(courses.length),

      }

    ]
  }

  // create options 

  return (
    <div>
      <p> Visulise</p>
      <div className='flex gap-x-5'>
        <button
          onClick={()=>setCurrChart("students")}
        >
          student
        </button>
        <button
          onClick={()=>setCurrChart("Income")}
        >
          Income 
        </button>

      </div>

      {/* Pie char t */}

      <div>
        <Pie
          data={currChart === "students" ? chartDataForStudents : chartDataForIncomes}
        />
      </div>

    </div>
  )
}

export default InstructorChart