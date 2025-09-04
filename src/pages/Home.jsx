import React from 'react'
import {Border_Card, Header} from '../components'
import coreMind_landscape from '/coreMind_landscape.png'

function Home() {
  return (
    <div>
      <Header />
      <div className="w-120">
         <Border_Card >
            <img src={coreMind_landscape} alt="CoreMind Landscape" className='w-40' />
            
         </Border_Card>
      </div>
    </div>
  )
}

export default Home