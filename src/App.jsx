import { useEffect, useState } from 'react'
import './App.css'
import Header from './screens/home/components/Header'
import Stats from './screens/home/components/Stats'
import RecipeContainer from './screens/home/components/RecipeContainer'

const token = import.meta.env.VITE_API_KEY 

function App() {

  const [total, setTotal] = useState(0)
  const [calories, setCalories] = useState(0)
  const [protein, setProtein] = useState(0)

  const dataSetters = {setTotal, setCalories, setProtein}

  useEffect(() => {
    console.log(`Total: ${total}`)
    console.log(`Calories: ${calories}`)
    console.log(`Protein: ${protein}`)
  }, [total, calories, protein])

  return (
    <>
      <Header/>
      <Stats total={total} calories={calories} protein={protein}/>
      <RecipeContainer token={token} dataSetters={dataSetters}/>
    </>
  )
}

export default App
