import React from 'react'
import spinner from './Spinner.svg';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '80px', height: '50px', margin: 'auto', display: 'block' }}
        alt="loading"
      />
    </div>
  )
}
