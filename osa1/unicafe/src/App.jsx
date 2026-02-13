import { useState } from 'react'

const Button = (props) => {
  return(
    <div>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  )
}

const StaticLine = ({text, stats}) => {
  return (
    <div>
      <p>{text} {stats}</p>
    </div>
  )
}



const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  if (all === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
  <div>
    <h2>statistics</h2>
    <StaticLine text={"good"} stats={props.good}/>
    <StaticLine text={"neutral"} stats={props.neutral}/>
    <StaticLine text={"bad"} stats={props.bad}/>
    <StaticLine text={"all"} stats={all}/>
    <StaticLine text={"average"} stats={(props.good - props.bad)/all}/>
    <StaticLine text={"positive"} stats={(props.good/all)*100 + "%"} />  
  </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text = "good" />
      <Button onClick={() => setNeutral(neutral + 1)} text = "neutral" />
      <Button onClick={() => setBad(bad + 1)} text = "bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App