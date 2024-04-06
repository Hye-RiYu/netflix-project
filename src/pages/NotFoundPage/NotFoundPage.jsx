import React from 'react'

const NotFoundPage = () => {
  return (
    <div style={{
      width: 500,
      height: 500,
      textAlign: 'center',
      position: 'relative',
      top: 150,
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize : 100,
        color: 'white',
      }}>404</h2>
      <h3 style={{
        fontSize : 30,
        color: 'white',
      }}>Page Not Found</h3>
      <p style={{
        fontSize : 16,
        color: 'white',
        fontWeight: 'lighter'
      }}>The resource requested could not be found on this server!</p>
    </div>
  )
}

export default NotFoundPage
