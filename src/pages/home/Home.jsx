import React from 'react'
import {Header} from '../../components'
import Home_Top from './Home_Top'
import Key_Features from './Key_Features'



function Home() {
  return (
    <div>
      <Header />
      <Home_Top />
      <h2 className='text-4xl font-medium my-10'>Key Features</h2>
      <Key_Features />
    </div>
  )
}

export default Home