import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RideTable from './pages/Riders'

function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
    <RideTable/>
         </React.Fragment>
  )
}

export default App
