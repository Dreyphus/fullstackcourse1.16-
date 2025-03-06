import { useState } from 'react'

const Button = (props) => (
  <button onClick = {props.onClick}>
    {props.text}
  </button>
)
const Header = (props) => (
  <h2>{props.text}</h2>
)

const StatisticLine = (props) => {
  if(props.text == "positive"){
    return(
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}%</td>
      </tr>
      
    )
  }
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  ) 
}
const Statistics = (props) => {
  if(props.total != 0){
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good}/>
            <StatisticLine text="neutral" value={props.neutral}/>
            <StatisticLine text="bad" value={props.bad}/>
            <StatisticLine text="all" value={props.total}/>
            <StatisticLine text="average" value={props.average}/>
            <StatisticLine text="positive" value={props.percentGood}/>
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <p>No feedback given</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [percentGood, setPercentGood] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    const newGood = good + 1
    const newTotal = newGood + neutral + bad
    setGood(newGood)
    setTotal(newTotal)
    setPercentGood(newGood / newTotal * 100)
    setAverage(getAverage(newGood, bad, newTotal))
  }
  
  const handleNeutralClick = () => {
    const newNeutral = neutral + 1
    const newTotal = good + newNeutral + bad
    setNeutral(newNeutral)
    setTotal(newTotal)
    setPercentGood(good / newTotal * 100)
    setAverage(getAverage(good, bad, newTotal))
  }  
  
  const handleBadClick = () => {
    const newBad = bad + 1
    const newTotal = good + neutral + newBad
    setBad(newBad)
    setTotal(newTotal)
    setPercentGood(good / newTotal * 100)
    setAverage(getAverage(good, newBad, newTotal))
  }

  const getAverage = (g, b, t) => {
    b = b * -1
    const sum = g + b
    const av = sum / t
    return av
}

  return (
    <div>
      <Header text="give feedback" />
      <div>
        <Button onClick={() => handleGoodClick()} text="good"/>
        <Button onClick={() => handleNeutralClick()} text="neutral"/>
        <Button onClick={() => handleBadClick()} text="bad"/>
      </div>
      <Header text="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} percentGood={percentGood} average={average}/>
    </div>
    
  )
}

export default App