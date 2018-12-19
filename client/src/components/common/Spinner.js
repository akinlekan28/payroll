import React from 'react'
import spinner from './Spinner.svg';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="loading"
      />
    </div>
  )
}
