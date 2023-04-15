import React from 'react'
import background from './background.png'

const App = () => {
  return (
    <div>
      <img 
        alt='background' 
        src={background} 
        style={{
          objectFit: 'contained',
          position: 'absolute',
          height: '100vh',
          width: '100vw',
          zIndex: -1
        }}
      />
    </div>
  )
}

export default App