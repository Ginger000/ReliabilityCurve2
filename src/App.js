import "./App.css"
import MySlider from "./components/MySlider";
import React, {useState} from 'react';

import test from "./testData.js"
import DATA from "./Data.js"
import { Button, Box} from "@mui/material";
const App = () => {
  const [reduction, setReduction] = useState(40);
  const [duration, setDuration] = useState(2);
  const [soilType, setSoilType] = useState(1);
  const [designStorm, setDesignStorm] = useState(1);
  const [surfaceType, setSurfaceType] = useState(0);
  // const startDepth = [];
  // const startLoadingRatio = []
  const [startDepth, setStartDepth] = useState([]);
  const [startLoadingRatio, setStartLoadingRatio] = useState([]);
  const [depth, setDepth] = useState(startDepth[0]);
  const [loadingRatio, setLoadingRatio] = useState(startLoadingRatio[0]);
  const changeReduction =(evt, value)=>{
    setReduction(value);
    // console.log("reduction ",value);
  }
  const changeDuration = (evt, value)=>{
    setDuration(value);
    // console.log("duration ", value);
  }
  const changeSoilType = (evt, value)=>{
    setSoilType(value);
    // console.log("soilType ", value);
  }
  const changeDesignStorm = (evt, value)=>{
    setDesignStorm(value);
    // console.log("designStorm ", value);
  }
  const changeSurfaceType = (evt, value)=>{
    setSurfaceType(value);
    // console.log("surfaceType ", value);
  }
  const changeDepth = (evt, value)=>{
    setDepth([value]);
    console.log("Depth ", value);
  }
  const changeRatio = (evt, value)=>{
    setLoadingRatio([value]);
    console.log("loadingRatio ", value);
  }
  

  const generate = (duration, soilType, designStorm, surfaceType, startDepth, startLoadingRatio) => {
    const scenarioArr = DATA[surfaceType][soilType][duration];
    const scenarios = scenarioArr.filter(s=>s["designStorm"] === designStorm && s["reliability"] === 1);
    console.log(scenarios);
    generateOutputSlider(scenarios, startDepth, startLoadingRatio);
  }

  const generateOutputSlider = (scenarios, startDepth, startLoadingRatio) => {
    const rand = Math.floor(Math.random()*scenarios.length);
    console.log("old Depth ",startDepth);
    console.log("old Ratio ",startLoadingRatio);

    setStartDepth([scenarios[rand]["depth"]]);
    setStartLoadingRatio([scenarios[rand]["loadingRatio"]])
    setDepth(startDepth)
    setLoadingRatio(startLoadingRatio)

    console.log("new Depth " ,startDepth);
    console.log("new Ratio" ,startLoadingRatio);
  }

  const a= 1;
  const b = 2;
  // const test = {
  //   0:{
  //       1:{
  //           2:[3,4,5,6]
  //       }
  //   }
  // }


  return (
    
    <div>Ginger
      {a}
      {test[0][1][2]}
      {DATA[0][3][2][0]["depth"]}
      
      <MySlider title="Reduction Amount" min={40} max={80} step={null} marks={[{value: 40,label: '40%'},{value: 80,label: '80%'}]} onChange={changeReduction} defaultVal={40}/>
      <MySlider title="Duration" min={2} max={24} step={null} marks={[{value: 2,label: '2hrs'},{value: 24,label: '24hrs'}]} onChange={changeDuration} defaultVal={2} />
      <MySlider title="Soil Type" min={1} max={3} step={null} marks={[{value: 1,label: 'Fine'},{value: 2,label: 'Mix'},{value: 3,label: 'corase'}]} onChange={changeSoilType} defaultVal={1} />
      <MySlider title="Design Storm" min={0} max={5} step={0.1} marks={[{value: 0,label: "0"},{value: 1,label: "1"},{value: 2,label: '2'},{value: 3,label: '3'},{value: 4,label: '4'},{value: 5,label: '5'}]} onChange={changeDesignStorm} defaultVal={0} />
      <MySlider title="Surface Type" min={0} max={1} step={null} marks={[{value: 0,label: "Planted"},{value: 1,label: 'Paved'}]} onChange={changeSurfaceType} defaultVal={0} />
      {/* onClick={generate} */}
      {/* onClick={generate(duration, soilType, designStorm, surfaceType)} */}
      <Button sx={{ml: 4, mt:4 }} variant="contained" onClick={()=>generate(duration, soilType, designStorm, surfaceType, startDepth, startLoadingRatio)} >GENERATE</Button>
      <Box  sx={{
      
        mt:4 ,
        width: 500,
        height: 300,
        // border: '1px dashed grey'
      }}>
        {console.log("check Depth ",startDepth)}
        {startDepth.map((d, idx)=>{
            console.log("runned");
            //???The point is that I didn't add return?
            return(


            <MySlider key={idx} title="Depth" min={12} max={30} step={null} marks={[{value: 12,label: "12"},{value: 18,label: '18'},{value: 24,label: '24'},{value: 30,label: '30'}]} onChange={changeDepth} defaultVal={d} />

            )
            
        
        })}
        {console.log("check Ratio ",startLoadingRatio)}
        {startLoadingRatio.map((l, idx)=>{
          console.log("runned2");
          return(
            <MySlider key={idx} title="Loading Ratio" min={0} max={1} step={null} marks={[{value: 0,label: "0"},{value: 0.125,label: "0.125"},{value: 0.16,label: '0.16'},{value: 0.2,label: '0.2'},{value: 0.33,label: '0.33'},{value: 0.5,label: '0.5'},{value: 1,label: '1'}]} onChange={changeRatio} defaultVal={l} />
          )
        })}
      </Box>

    </div>
  );
}

export default App;
