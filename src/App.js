import logo from './logo.svg';
import './App.css';
import Histogram from "react-chart-histogram";
import { useState, useRef, useEffect } from "react";
// import DATA from './RATEINF-CPI_USA.csv';



import Papa from 'papaparse';
const DATA = [
  ["1947-12-31","260.3"],
  ["1948-12-31","280.7"],
  ["1949-12-31","271"],
  ["1950-12-31","320.3"],
  ["1951-12-31","356.6"],
  ["1952-12-31","381.2"]
];


//const DATA_ARRAY = [];



// const convertHourToNumber = (value) =>
//   Number(String(value).replace(":", ".") || 0);

const mapData = (argData, start, end) => {
  let values = [];
  let date = [];
  argData.forEach(element => {
    if(new Date(start) <= new Date(element[0]) && new Date(element[0]) <= new Date(end)){
      date.push(element[0])
      values.push(element[1])
    }
    })

    console.log(date)
  const labels = date;
  const data = values;
  return {labels, data};
};


function App() {

  const [start, setStartDate] = useState("");
  const [end, setEndDate] = useState("");
  const { data, labels } = mapData(DATA, start, end);
  const [dates, setDates] = useState("Monthly");


  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const handleChange = (event) => {
    setDates(event.target.value)
  }

  const ref = useRef(null);

  const handleClick = () => {
    // 👇️ reset input field's value
    ref.current.value = '';
  }

  const options = {
    xLabel: "az",
    fillColor: "#00B3C9",
    strokeColor: "#00B3C9"
  };
  return (
    <div className="App">
      <div>
        <label>Enter Start Date:
        <input
            type="text" 
            value={start}
            ref={ref}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        
        <label>Enter End Date:
        <input
            type="text" 
            value={end}
            ref={ref}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <select value={dates} onChange={handleChange}>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
        <button onClick={handleClick}>Clear field</button>
      </div>
      <Histogram
          xLabels={labels}
          yValues={data}
          width='800'
          height='800'
          options={options}
      />
  </div>

  );
}

export default App;


