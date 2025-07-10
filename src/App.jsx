import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import RecipeContainer from './components/RecipeContainer'

const token = import.meta.env.VITE_API_KEY 

function App() {

  return (
    <>
      <Header/>
      <RecipeContainer token={token}/>
    </>
  )
}

export default App
